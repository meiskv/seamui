"use client"

import * as React from "react"
import { Volume2, VolumeX } from "lucide-react"
import { useWebHaptics } from "web-haptics/react"

import { Button } from "@/registry/seam/ui/button"

/**
 * WIP preview of seam's touch-feedback pillar with real haptics — driven by
 * web-haptics (haptics.lochie.me). On press each key springs (seam depth) and
 * fires the web-haptics feedback: the Vibration API on Android, the taptic
 * "switch" trick on iOS, plus the library's click audio (debug: true so the
 * audio plays on every device, not just the iOS fallback). The Expo / React
 * Native build swaps web-haptics for on-device expo-haptics.
 */
const TAPS: { label: string; preset: "light" | "medium" | "heavy" }[] = [
  { label: "Light", preset: "light" },
  { label: "Medium", preset: "medium" },
  { label: "Heavy", preset: "heavy" },
]

export function HapticButtons() {
  const [muted, setMuted] = React.useState(false)
  // debug: true makes web-haptics also play its click audio on every device
  // (by default the audio only fires as the iOS fallback) — the "lochie feel".
  const { trigger } = useWebHaptics({ debug: true })

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {TAPS.map((tap) => (
          <Button
            key={tap.label}
            variant="secondary"
            onPointerDown={() => {
              if (!muted) void trigger(tap.preset)
            }}
          >
            {tap.label}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
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
        Vibration API / iOS taptic). Real on-device haptics arrive with the Expo
        / React Native build.
      </p>
    </div>
  )
}
