"use client"

import type * as React from "react"
import { Meter as BaseMeter } from "@base-ui/react/meter"

import { cn } from "@/lib/utils"

const SIZES = {
  sm: "size-4",
  md: "size-5",
  lg: "size-7",
} as const

// Ring geometry: drawn in a fixed 24-unit viewBox, scaled by the size class.
const RADIUS = 10.5
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// A compact gauge of context-window usage for composer footers and workbench
// headers. Base UI Meter provides the semantics (role="meter" — a static
// measurement, not task progress); the ring translates the debossed rule to
// stroke: the track is the carved slot, the primary arc is the token rising
// in it. Past `criticalAt` the arc turns destructive — the monochrome theme's
// one "act now" hue.
function ContextMeter({
  value,
  max = 100,
  size = "sm",
  showValue = false,
  criticalAt = 0.85,
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMeter.Root> & {
  size?: keyof typeof SIZES
  /** Render the usage as a percentage next to the ring. */
  showValue?: boolean
  /** Fraction (0–1) past which the fill turns destructive. */
  criticalAt?: number
}) {
  const fraction = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0
  const critical = fraction >= criticalAt
  const percent = Math.round(fraction * 100)

  return (
    <BaseMeter.Root
      data-slot="context-meter"
      data-critical={critical || undefined}
      aria-label="Context used"
      value={value}
      max={max}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    >
      {/* Decorative — the Meter root carries the accessible name and value. */}
      <svg
        viewBox="0 0 24 24"
        role="presentation"
        aria-hidden="true"
        className={cn("-rotate-90 shrink-0", SIZES[size])}
      >
        <circle
          cx="12"
          cy="12"
          r={RADIUS}
          fill="none"
          strokeWidth="3"
          className="stroke-border"
        />
        <circle
          cx="12"
          cy="12"
          r={RADIUS}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - fraction)}
          // eased dash-offset — a layout dimension that can't spring cleanly,
          // same rule as Meter's width fill.
          className={cn(
            "transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none",
            critical ? "stroke-destructive" : "stroke-primary"
          )}
        />
      </svg>
      {showValue && (
        <span
          data-slot="context-meter-value"
          aria-hidden
          className={cn(
            "text-xs tabular-nums",
            critical ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {percent}%
        </span>
      )}
      {children}
    </BaseMeter.Root>
  )
}

export { ContextMeter }
