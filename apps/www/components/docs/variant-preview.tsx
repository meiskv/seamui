"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Grid2x2, Grid2x2X } from "lucide-react"

import { cn } from "@/lib/utils"
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

const GRID_KEY = "seam-preview-grid"

/**
 * The detail-page preview, styled as a specimen to echo the home page: the
 * live example sits on drafting-dot paper (toggle it off with the grid key,
 * remembered across pages), a variant switcher docks below, and the selected
 * variant's source is always visible in its own highlighted block underneath.
 * The variant keys dogfood the seamui Button; the example swap is opacity-only
 * (fades.fast). The selected variant reflects in the URL hash, so a variant is
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
  const [grid, setGrid] = React.useState(true)

  // On mount, honor a deep link like `#loading` and the saved grid choice.
  React.useEffect(() => {
    try {
      if (localStorage.getItem(GRID_KEY) === "off") setGrid(false)
    } catch {
      // storage unavailable — keep the default
    }
    if (!syncHash) return
    const hash = window.location.hash.slice(1)
    if (hash && variants.some((v) => v.key === hash)) setVariant(hash)
  }, [syncHash, variants])

  const toggleGrid = () => {
    setGrid((on) => {
      const next = !on
      try {
        localStorage.setItem(GRID_KEY, next ? "on" : "off")
      } catch {
        // ignore
      }
      return next
    })
  }

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
      {/* Preview: the live example on drafting-dot paper, switcher docked below. */}
      <div className="squircle bg-card overflow-hidden rounded-xl border shadow-resting">
        <div className="relative">
          {/* drafting dots — the specimen surface, toggleable */}
          <div
            aria-hidden
            className={cn(
              "text-border/70 pointer-events-none absolute inset-0 transition-opacity duration-200 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px]",
              grid ? "opacity-100" : "opacity-0"
            )}
          />
          <Button
            variant="ghost"
            size="icon"
            haptic="tick"
            aria-label={grid ? "Hide grid" : "Show grid"}
            aria-pressed={grid}
            onClick={toggleGrid}
            className="text-muted-foreground absolute right-2 top-2 z-10 size-7"
          >
            {grid ? (
              <Grid2x2 className="size-4" />
            ) : (
              <Grid2x2X className="size-4" />
            )}
          </Button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active?.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fades.fast}
            >
              <div className="relative flex min-h-44 items-center justify-center p-6">
                {active?.component}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {multi ? (
          <div
            role="group"
            aria-label="Variant"
            className="bg-card relative flex flex-wrap gap-1 border-t p-1.5"
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
