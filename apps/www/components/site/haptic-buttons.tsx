"use client"

import * as React from "react"
import { Volume2, VolumeX } from "lucide-react"

import { HapticsProvider, type HapticPreset } from "@/lib/haptics"
import { Button } from "@/registry/seam/ui/button"

/**
 * Preview of seam's touch-feedback pillar with real haptics — dogfooding the
 * registry's own `@/lib/haptics`. Each key springs (seam depth) and fires its
 * haptic preset straight through Button's `haptic` prop: the Vibration API on
 * Android, the taptic trick on iOS, plus the click audio. A nested provider
 * scopes the mute toggle to this demo.
 */
const TAPS: { label: string; preset: HapticPreset }[] = [
  { label: "Tap", preset: "tap" },
  { label: "Tick", preset: "tick" },
  { label: "Error", preset: "error" },
]

export function HapticButtons() {
  const [muted, setMuted] = React.useState(false)

  return (
    <HapticsProvider enabled={!muted}>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {TAPS.map((tap) => (
            <Button key={tap.label} variant="secondary" haptic={tap.preset}>
              {tap.label}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            haptic={false}
            aria-label={muted ? "Unmute tap feedback" : "Mute tap feedback"}
            aria-pressed={muted}
            className="text-muted-foreground ml-auto"
            onClick={() => setMuted((m) => !m)}
          >
            {muted ? <VolumeX /> : <Volume2 />}
          </Button>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Tap a key — it springs and clicks. On a phone it buzzes too (Android
          Vibration API / iOS taptic). Mount{" "}
          <code>&lt;HapticsProvider&gt;</code> and every seamui control does
          this.
        </p>
      </div>
    </HapticsProvider>
  )
}
