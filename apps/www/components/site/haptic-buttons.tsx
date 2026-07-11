"use client"

import * as React from "react"
import { Volume2, VolumeX, Vibrate, VibrateOff } from "lucide-react"

import { HapticsProvider, type HapticPreset } from "@/lib/haptics"
import { Button } from "@/registry/seam/ui/button"

/**
 * A live tester for seam's touch-feedback pillar, dogfooding the registry's
 * own `@/lib/haptics`. The two runtime controls — `enabled` and `sound` — are
 * exactly the props you wire to a user setting; flip them and every preset key
 * responds immediately. Each key fires its preset straight through Button's
 * `haptic` prop: the Vibration API on Android, the taptic trick on iOS, plus
 * the click audio. A scoped provider keeps this demo's toggles local.
 */
const PRESETS: { label: string; preset: HapticPreset }[] = [
  { label: "Tap", preset: "tap" },
  { label: "Tick", preset: "tick" },
  { label: "Success", preset: "success" },
  { label: "Error", preset: "error" },
]

export function HapticButtons() {
  const [enabled, setEnabled] = React.useState(true)
  const [sound, setSound] = React.useState(true)

  return (
    <HapticsProvider enabled={enabled} sound={sound}>
      <div className="space-y-3">
        {/* runtime controls — the two props you'd bind to a settings screen */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={enabled ? "secondary" : "outline"}
            size="sm"
            haptic={false}
            aria-pressed={enabled}
            onClick={() => setEnabled((v) => !v)}
          >
            {enabled ? <Vibrate /> : <VibrateOff />}
            Haptics {enabled ? "on" : "off"}
          </Button>
          <Button
            variant={sound ? "secondary" : "outline"}
            size="sm"
            haptic={false}
            aria-pressed={sound}
            disabled={!enabled}
            onClick={() => setSound((v) => !v)}
          >
            {sound ? <Volume2 /> : <VolumeX />}
            Sound {sound ? "on" : "off"}
          </Button>
        </div>

        {/* preset keys */}
        <div className="flex flex-wrap items-center gap-3">
          {PRESETS.map((t) => (
            <Button key={t.label} variant="secondary" haptic={t.preset}>
              {t.label}
            </Button>
          ))}
        </div>

        <p className="text-muted-foreground text-xs leading-relaxed">
          Tap a key — it springs and clicks. On a phone it buzzes too (Android
          Vibration API / iOS taptic). Mount{" "}
          <code>&lt;HapticsProvider&gt;</code> once and every seamui control
          does this; <code>enabled</code> and <code>sound</code> are the runtime
          knobs.
        </p>
      </div>
    </HapticsProvider>
  )
}
