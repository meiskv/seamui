"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { fades } from "@/lib/motion"
import { Tabs, TabsList, TabsTrigger } from "@/registry/seam/ui/tabs"

export type PreviewVariant = {
  /** URL-hash-safe slug, e.g. "loading". */
  key: string
  /** Label shown on the switcher key. */
  title: string
  /** The live example. */
  component: React.ReactNode
  /** Exact registry source for this variant. */
  code: string
  /** Optional one-line note shown above the panel for this variant. */
  description?: React.ReactNode
}

/**
 * The LiveKit-style detail-page preview: one persistent panel with a variant
 * switcher (left) and a Preview/Code toggle (right). Selecting a variant swaps
 * the live example AND its source in place — no long scroll of stacked
 * examples. Both switchers dogfood the seamui Tabs (a debossed well the active
 * key rises out of); the panel swap is opacity-only, so it reads the same
 * under reduced motion. The selected variant is reflected in the URL hash, so
 * a variant is linkable (e.g. `…/button#loading`).
 */
export function VariantPreview({
  variants,
  syncHash = true,
}: {
  variants: PreviewVariant[]
  /** Reflect the selected variant in the URL hash. Turn off for secondary
   *  previews so multiple panels on one page don't fight over the hash. */
  syncHash?: boolean
}) {
  const [variant, setVariant] = React.useState(variants[0]?.key)
  const [view, setView] = React.useState<"preview" | "code">("preview")

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
    <div className="squircle bg-card my-4 overflow-hidden rounded-xl border">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b px-2 py-1.5">
        {multi ? (
          <Tabs
            value={variant}
            onValueChange={(v) => selectVariant(v as string)}
            size="sm"
          >
            <TabsList>
              {variants.map((v) => (
                <TabsTrigger key={v.key} value={v.key}>
                  {v.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        ) : (
          <span />
        )}

        <Tabs
          value={view}
          onValueChange={(v) => setView(v as "preview" | "code")}
          size="sm"
        >
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {multi && active?.description ? (
        <p className="text-muted-foreground border-b px-4 py-2 text-sm">
          {active.description}
        </p>
      ) : null}

      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${active?.key}-${view}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fades.fast}
          >
            {view === "preview" ? (
              <div className="flex min-h-40 items-center justify-center p-6">
                {active?.component}
              </div>
            ) : (
              <pre className="min-h-40 overflow-x-auto p-4 text-[0.8125rem] leading-relaxed">
                <code>{active?.code}</code>
              </pre>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
