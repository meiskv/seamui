"use client"

import * as React from "react"

import { ContextMeter } from "@/registry/seam/ui/context-meter"
import { Slider } from "@/registry/seam/ui/slider"

// Past criticalAt (default 85%) the fill turns destructive — drag the slider
// across the threshold to watch the arc ease and flip.
export default function ContextMeterCritical() {
  const [value, setValue] = React.useState(78)

  return (
    <div className="flex w-56 flex-col gap-4">
      <div className="flex items-center gap-3">
        <ContextMeter value={value} size="lg" showValue />
        <span className="text-muted-foreground text-sm">of 200k tokens</span>
      </div>
      <Slider
        value={value}
        onValueChange={(v) => setValue(v as number)}
        aria-label="Simulated context usage"
      />
    </div>
  )
}
