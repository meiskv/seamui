"use client"

import * as React from "react"
import { useReducedMotion } from "motion/react"
import { Info } from "lucide-react"

/**
 * seamui is a motion library, so visitors with the OS "Reduce Motion"
 * accessibility setting enabled would otherwise wonder why nothing springs.
 * Tell them what they're seeing instead of letting the demos look broken.
 */
export function ReducedMotionNotice() {
  const reduceMotion = useReducedMotion()
  // The reduced-motion preference isn't known during SSR, so render nothing
  // until after mount — otherwise server (null) and client disagree and React
  // reports a hydration mismatch.
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted || !reduceMotion) return null

  return (
    <div className="bg-muted text-muted-foreground mx-auto mt-4 flex max-w-3xl items-start gap-2.5 rounded-lg squircle px-4 py-3 text-sm">
      <Info className="mt-0.5 size-4 shrink-0" />
      <p>
        <span className="text-foreground font-medium">
          Reduce Motion is enabled on your device,
        </span>{" "}
        so seamui is showing its reduced variants — opacity fades and dims
        instead of springs and depth. To see the full motion system, turn it off
        (macOS: System Settings → Accessibility → Display → Reduce Motion) and
        reload.
      </p>
    </div>
  )
}
