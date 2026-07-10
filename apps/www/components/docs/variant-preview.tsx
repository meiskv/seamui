"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { fades } from "@/lib/motion"
import { Button } from "@/registry/seam/ui/button"
import { CodeBlock } from "@/registry/seam/ui/code-block"

export type PreviewVariant = {
  /** URL-hash-safe slug, e.g. "loading". */
  key: string
  /** Label shown on the switcher key. */
  title: string
  /** The live example. */
  component: React.ReactNode
  /** Exact registry source for this variant. */
  code: string
  /** Optional one-line note shown between the preview and its code. */
  description?: React.ReactNode
}

/**
 * The LiveKit-style detail-page preview: one live example with a variant
 * switcher **below** it, and the selected variant's source always visible in
 * its own highlighted block underneath — no long scroll of stacked examples,
 * no click to reveal the code. The variant keys dogfood the seamui Button at
 * its smallest size (active = a raised secondary key); the example swap is
 * opacity-only (fades.fast), identical under reduced motion. The code section
 * dogfoods the seamui CodeBlock, so it comes syntax-highlighted with a copy
 * key for free. The selected variant reflects in the URL hash, so a variant is
 * deep-linkable (e.g. `…/button#loading`).
 */
export function VariantPreview({
  variants,
  language = "tsx",
  syncHash = true,
}: {
  variants: PreviewVariant[]
  /** Language for the code section's highlighter. */
  language?: string
  /** Reflect the selected variant in the URL hash. Turn off for secondary
   *  previews so multiple panels on one page don't fight over the hash. */
  syncHash?: boolean
}) {
  const [variant, setVariant] = React.useState(variants[0]?.key)

  // On mount, honor a deep link like `#loading`.
  React.useEffect(() => {
    if (!syncHash) return
    const hash = window.location.hash.slice(1)
    if (hash && variants.some((v) => v.key === hash)) setVariant(hash)
  }, [syncHash, variants])

  const selectVariant = (key: string) => {
    setVariant(key)
    if (syncHash && typeof window !== "undefined") {
      // replaceState so choosing a variant never scrolls the page.
      window.history.replaceState(null, "", `#${key}`)
    }
  }

  const active = variants.find((v) => v.key === variant) ?? variants[0]
  const multi = variants.length > 1

  return (
    <div className="my-4 space-y-3">
      {/* Preview: the live example, with the variant switcher docked below it. */}
      <div className="squircle bg-card overflow-hidden rounded-xl border">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active?.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fades.fast}
          >
            <div className="flex min-h-40 items-center justify-center p-6">
              {active?.component}
            </div>
          </motion.div>
        </AnimatePresence>

        {multi ? (
          <div
            role="group"
            aria-label="Variant"
            className="flex flex-wrap gap-1 border-t p-1.5"
          >
            {variants.map((v) => (
              <Button
                key={v.key}
                size="sm"
                variant={v.key === variant ? "secondary" : "ghost"}
                aria-pressed={v.key === variant}
                onClick={() => selectVariant(v.key)}
              >
                {v.title}
              </Button>
            ))}
          </div>
        ) : null}
      </div>

      {multi && active?.description ? (
        <p className="text-muted-foreground text-sm">{active.description}</p>
      ) : null}

      {/* Code: always visible, its own section, highlighted with a copy key. */}
      <CodeBlock code={active?.code ?? ""} language={language} />
    </div>
  )
}
