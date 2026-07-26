"use client"

import type * as React from "react"

import { HapticsProvider, type HapticPreset } from "@/lib/haptics"
import type { MotionPreference } from "@/lib/motion"
import { Button } from "@/registry/seam/ui/button"
import { Switch } from "@/registry/seam/ui/switch"
import { Toggle } from "@/registry/seam/ui/toggle"
import { ToggleGroup } from "@/registry/seam/ui/toggle-group"

/**
 * Stage environment — the two library-wide layers (motion and haptics) that
 * every component reacts to, but which aren't props on any of them.
 *
 * These wrap the preview rather than feed the code generator: `reducedMotion`
 * rides `MotionPreferenceProvider` (what seamui's own `useReducedMotion`
 * reads), and the haptics switches nest a second `HapticsProvider` over the
 * stage. Both are things you'd set once in an app shell, so they stay out of
 * the snippet.
 */

export type StageEnv = {
  /** Overrides `useReducedMotion()` for the preview subtree. */
  reducedMotion: MotionPreference
  haptics: boolean
  sound: boolean
}

export const DEFAULT_ENV: StageEnv = {
  reducedMotion: "system",
  haptics: true,
  sound: true,
}

const MOTION_OPTIONS: Array<{
  value: MotionPreference
  label: string
  hint: string
}> = [
  { value: "system", label: "System", hint: "Follow the OS setting" },
  { value: "reduce", label: "Reduced", hint: "Force the reduced variant" },
  { value: "full", label: "Full", hint: "Force full motion" },
]

/** Every preset the haptics layer ships — press one to feel (or hear) it. */
const HAPTIC_PRESETS: Array<{
  preset: HapticPreset
  label: string
  use: string
}> = [
  { preset: "tap", label: "Tap", use: "Buttons and toggles, on press" },
  { preset: "tick", label: "Tick", use: "State commits — switch, slider, OTP" },
  { preset: "success", label: "Success", use: "A completed action" },
  { preset: "error", label: "Error", use: "A rejected or invalid action" },
]

/**
 * Lives inside the panel's own provider so the switches above govern it.
 *
 * The preset fires from Button's own `haptic` prop and nothing else — an
 * additional onClick would play the preset twice per press, which on the
 * panel whose whole job is demonstrating what each preset feels like would
 * mis-demo every one of them as a double pulse.
 */
function HapticTesters() {
  return (
    <div className="flex flex-wrap gap-1 px-1">
      {HAPTIC_PRESETS.map((item) => (
        <Button
          key={item.preset}
          variant="secondary"
          size="sm"
          haptic={item.preset}
          title={item.use}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}

function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-9 items-center justify-between gap-3 px-1">
      <span className="text-sm">{label}</span>
      {children}
    </div>
  )
}

export function EnvironmentPanel({
  env,
  onChange,
}: {
  env: StageEnv
  onChange: (env: StageEnv) => void
}) {
  const active = MOTION_OPTIONS.find((o) => o.value === env.reducedMotion)

  return (
    <section className="space-y-2 border-t pt-4">
      <h3 className="text-muted-foreground px-1 text-xs font-medium">
        Stage — motion &amp; haptics
      </h3>

      <div className="space-y-1 px-1">
        <span className="text-sm">Motion</span>
        <ToggleGroup
          value={[env.reducedMotion]}
          // single-select: keep the current value if the pressed key is
          // already the active one.
          onValueChange={(next: string[]) => {
            const picked = next.at(-1) as MotionPreference | undefined
            if (picked) onChange({ ...env, reducedMotion: picked })
          }}
          className="flex w-full"
          aria-label="Motion"
        >
          {MOTION_OPTIONS.map((option) => (
            <Toggle
              key={option.value}
              value={option.value}
              size="sm"
              title={option.hint}
              className="flex-1"
            >
              {option.label}
            </Toggle>
          ))}
        </ToggleGroup>
        <p className="text-muted-foreground text-xs">{active?.hint}</p>
      </div>

      <Row label="Haptics">
        <Switch
          size="sm"
          checked={env.haptics}
          onCheckedChange={(next: boolean) =>
            onChange({ ...env, haptics: next })
          }
          aria-label="Haptics"
        />
      </Row>

      <Row label="Sound">
        <Switch
          size="sm"
          checked={env.sound}
          disabled={!env.haptics}
          onCheckedChange={(next: boolean) => onChange({ ...env, sound: next })}
          aria-label="Haptic sound"
        />
      </Row>

      <div className="space-y-1">
        <span className="text-muted-foreground px-1 text-xs">
          Presets — press to feel one
        </span>
        <HapticsProvider enabled={env.haptics} sound={env.sound}>
          <HapticTesters />
        </HapticsProvider>
      </div>

      <p className="text-muted-foreground px-1 pt-1 text-xs">
        Applies to the preview only — these are app-shell settings, so they stay
        out of the generated code.
      </p>
    </section>
  )
}
