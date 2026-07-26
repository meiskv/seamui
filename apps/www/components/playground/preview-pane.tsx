"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Grid2x2, Grid2x2X } from "lucide-react"

import { cn } from "@/lib/utils"
import { fades } from "@/lib/motion"
import { Button } from "@/registry/seam/ui/button"
import { CodeBlock } from "@/registry/seam/ui/code-block"
import { Label } from "@/registry/seam/ui/label"
import { Switch } from "@/registry/seam/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/seam/ui/tabs"
import type { KnobValues, PlaygroundSpec } from "@/lib/playground/types"

const GRID_KEY = "seam-preview-grid"

type Highlight = { top: number; left: number; width: number; height: number }

/**
 * Inspect mode — hover any part of the preview to see which seamui slot it is.
 * It reads `data-slot`, the attribute every seamui wrapper already carries, so
 * the inspector needs no per-component metadata and can never fall out of sync
 * with a component's anatomy.
 */
function useInspector(enabled: boolean) {
  const stageRef = React.useRef<HTMLDivElement>(null)
  const [slot, setSlot] = React.useState<string | null>(null)
  const [rect, setRect] = React.useState<Highlight | null>(null)

  const clear = React.useCallback(() => {
    setSlot(null)
    setRect(null)
  }, [])

  React.useEffect(() => {
    if (!enabled) clear()
  }, [enabled, clear])

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled) return
      const stage = stageRef.current
      if (!stage) return

      const target = event.target as HTMLElement | null
      const match = target?.closest<HTMLElement>("[data-slot]")
      if (!match || !stage.contains(match)) return clear()

      const stageBox = stage.getBoundingClientRect()
      const box = match.getBoundingClientRect()
      setSlot(match.dataset.slot ?? null)
      setRect({
        top: box.top - stageBox.top,
        left: box.left - stageBox.left,
        width: box.width,
        height: box.height,
      })
    },
    [enabled, clear]
  )

  return { stageRef, slot, rect, onPointerMove, clear }
}

export function PreviewPane({
  spec,
  values,
  code,
  className,
}: {
  spec: PlaygroundSpec
  values: KnobValues
  code: string
  className?: string
}) {
  const [tab, setTab] = React.useState("preview")
  const [inspect, setInspect] = React.useState(false)
  const [grid, setGrid] = React.useState(true)
  const { stageRef, slot, rect, onPointerMove, clear } = useInspector(inspect)

  // Honor the grid choice shared with the docs' VariantPreview.
  React.useEffect(() => {
    try {
      if (localStorage.getItem(GRID_KEY) === "off") setGrid(false)
    } catch {
      // storage unavailable — keep the default
    }
  }, [])

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

  // Uncontrolled defaults (a Switch's `defaultChecked`, a Tabs' `defaultValue`)
  // only apply on mount, so remount the preview when a non-text knob changes —
  // otherwise flipping "On by default" would leave the live switch untouched.
  // Text knobs are excluded so typing a label doesn't blow away focus/state.
  const remountKey = React.useMemo(() => {
    const structural: Record<string, unknown> = {}
    for (const knob of spec.knobs) {
      if (knob.kind !== "text") structural[knob.id] = values[knob.id]
    }
    return `${spec.id}:${JSON.stringify(structural)}`
  }, [spec, values])

  return (
    <div className={cn("flex min-w-0 flex-col", className)}>
      <div className="squircle bg-card overflow-hidden rounded-xl border shadow-resting">
        <Tabs value={tab} onValueChange={(v: unknown) => setTab(String(v))}>
          {/* Control strip: Preview/Code on the left, Inspect on the right. */}
          <div className="flex items-center justify-between gap-3 border-b p-2.5">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              {tab === "preview" ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    haptic="tick"
                    aria-label={grid ? "Hide grid" : "Show grid"}
                    aria-pressed={grid}
                    onClick={toggleGrid}
                    className="text-muted-foreground size-7"
                  >
                    {grid ? (
                      <Grid2x2 className="size-4" />
                    ) : (
                      <Grid2x2X className="size-4" />
                    )}
                  </Button>
                  <Switch
                    id="playground-inspect"
                    checked={inspect}
                    onCheckedChange={(next: boolean) => setInspect(next)}
                  />
                  <Label
                    htmlFor="playground-inspect"
                    className="text-muted-foreground pr-1 text-sm font-normal"
                  >
                    Inspect
                  </Label>
                </>
              ) : null}
            </div>
          </div>

          <TabsContent value="preview">
            <div
              ref={stageRef}
              onPointerMove={onPointerMove}
              onPointerLeave={clear}
              className="relative"
            >
              <div
                aria-hidden
                className={cn(
                  "text-border/70 pointer-events-none absolute inset-0 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px]",
                  grid ? "opacity-100" : "opacity-0"
                )}
              />

              <div
                className={cn(
                  "relative flex min-h-[28rem] items-center justify-center p-8",
                  inspect && "cursor-crosshair",
                  spec.stageClassName
                )}
              >
                <div key={remountKey} className="contents">
                  {spec.render(values)}
                </div>
              </div>

              {/* The inspector outline. Tracks the pointer exactly, so it is
                  deliberately not animated — a lagging outline reads as a bug. */}
              {inspect && rect && slot ? (
                <div
                  aria-hidden
                  className="pointer-events-none absolute z-20 rounded-sm ring-2 ring-ring/70"
                  style={{
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                  }}
                >
                  <span className="bg-primary text-primary-foreground absolute -top-5 left-0 rounded px-1.5 py-0.5 font-mono text-[10px] leading-tight whitespace-nowrap">
                    {slot}
                  </span>
                </div>
              ) : null}
            </div>
          </TabsContent>

          <TabsContent value="code" className="p-3">
            <CodeBlock code={code} language="tsx" />
          </TabsContent>
        </Tabs>
      </div>

      {/* Live region so the inspected slot is announced, not just outlined. */}
      <p aria-live="polite" className="sr-only">
        {inspect && slot ? `Inspecting ${slot}` : ""}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={spec.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fades.fast}
          className="text-muted-foreground px-1 pt-3 text-sm"
        >
          {spec.description}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
