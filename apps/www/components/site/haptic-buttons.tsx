"use client"

import * as React from "react"

import { Button } from "@/registry/seam/ui/button"

/**
 * WIP preview of seam's touch-feedback pillar with real haptics. On the web
 * the closest analog to native haptics is the Vibration API; on press each
 * button springs (seam depth) and fires a haptic tick where the device
 * supports it. The Expo / React Native build swaps this for on-device
 * haptics (expo-haptics / haptics.lochie.me).
 *
 * Fires on pointerdown so the buzz lands with the press — not the click —
 * matching the "react in ≤1 frame" rule.
 */
const TAPS: { label: string; pattern: number | number[] }[] = [
  { label: "Light", pattern: 6 },
  { label: "Medium", pattern: 16 },
  { label: "Heavy", pattern: [10, 8, 22] },
]

export function HapticButtons() {
  const [supported, setSupported] = React.useState(true)

  React.useEffect(() => {
    setSupported(
      typeof navigator !== "undefined" && typeof navigator.vibrate === "function"
    )
  }, [])

  function buzz(pattern: number | number[]) {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(pattern)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {TAPS.map((tap) => (
          <Button
            key={tap.label}
            variant="secondary"
            onPointerDown={() => buzz(tap.pattern)}
          >
            {tap.label}
          </Button>
        ))}
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed">
        {supported
          ? "Tap on a phone — the press springs and fires a haptic tick."
          : "This device has no Vibration API — try an Android phone. Real on-device haptics arrive with the Expo / React Native build."}
      </p>
    </div>
  )
}
