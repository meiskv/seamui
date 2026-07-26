"use client"

import * as React from "react"
import { MotionConfig } from "motion/react"

import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/docs/code-block"
import { HapticsProvider } from "@/lib/haptics"
import { Switch } from "@/registry/seam/ui/switch"
import type { PlaygroundSpec } from "@/lib/playground/types"
import { InspectLayer } from "./inspect-layer"
import type { StageEnv } from "./environment-panel"

/**
 * The middle pane: the live component over drafting-dot paper, with its
 * generated source directly underneath.
 *
 * The source is always visible rather than behind a tab — the whole point of
 * the right-hand panel is watching a knob change the markup, and a tab you
 * have to click hides exactly that. Same convention as the docs
 * `VariantPreview`. Inspect sits over the preview because it applies to the
 * rendered output, not the code.
 */
export function Stage({
  spec,
  preview,
  code,
  env,
}: {
  spec: PlaygroundSpec
  preview: React.ReactNode
  code: string
  env: StageEnv
}) {
  const [inspect, setInspect] = React.useState(false)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-muted-foreground text-xs font-medium">
          Preview
        </span>
        <label className="text-muted-foreground flex items-center gap-2 text-sm">
          <Switch
            checked={inspect}
            onCheckedChange={setInspect}
            aria-label="Inspect slots"
          />
          Inspect
        </label>
      </div>

      <div className="squircle bg-card relative overflow-hidden rounded-xl border shadow-resting">
        <div
          aria-hidden
          className="text-border/70 pointer-events-none absolute inset-0 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px]"
        />
        <InspectLayer active={inspect}>
          <div
            className={cn(
              "relative flex min-h-72 items-center justify-center p-8",
              spec.stageClassName
            )}
          >
            {/* MotionConfig overrides useReducedMotion() for the subtree; the
                nested HapticsProvider shadows the site-wide one, so both
                settings are the real library layers, not a simulation. */}
            <MotionConfig reducedMotion={env.reducedMotion}>
              <HapticsProvider enabled={env.haptics} sound={env.sound}>
                {preview}
              </HapticsProvider>
            </MotionConfig>
          </div>
        </InspectLayer>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-muted-foreground text-xs font-medium">Code</span>
        <span className="text-muted-foreground text-xs">
          Paths assume a fresh <code>seamui add</code> install
        </span>
      </div>

      {/* Long snippets scroll in place so the preview never gets pushed off
          screen while you're tuning. The type is a notch smaller than the docs
          use — this is a panel you glance at while turning knobs, not prose —
          and it's set here rather than on the shared CodeBlock so docs pages
          and installed copies keep their own size. */}
      <div className="max-h-96 overflow-auto [&_[data-slot=code-block-content]]:text-xs [&_[data-slot=code-block-content]]:leading-relaxed">
        <CodeBlock>{code}</CodeBlock>
      </div>
    </div>
  )
}
