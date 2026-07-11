"use client"

// seam haptics — the tactile third of the touch-feedback pillar.
//
// Mount <HapticsProvider> once around your app shell and every seamui
// control clicks and buzzes as you use it: the Vibration API on Android,
// web-haptics' taptic trick on iOS, plus an audible tick when `sound` is on
// (the same feel as the seamui landing page). Without a provider every
// trigger is a silent no-op, so components can always call the hook.
import * as React from "react"
import { useWebHaptics } from "web-haptics/react"

type HapticPreset = "tap" | "tick" | "success" | "error"

type HapticsContextValue = {
  enabled: boolean
  /** Fire a haptic (and its click, when sound is on). Never throws. */
  trigger: (preset?: HapticPreset) => void
}

const HapticsContext = React.createContext<HapticsContextValue>({
  enabled: false,
  trigger: () => {},
})

/** seam presets → web-haptics intensities. */
const INTENSITY: Record<HapticPreset, "light" | "medium" | "heavy"> = {
  tap: "light",
  tick: "medium",
  success: "medium",
  error: "heavy",
}

function HapticsProvider({
  enabled = true,
  sound = true,
  children,
}: {
  enabled?: boolean
  /** Also play the click audio on every device (web-haptics' debug mode). */
  sound?: boolean
  children: React.ReactNode
}) {
  const { trigger: fire } = useWebHaptics({ debug: sound })

  const value = React.useMemo<HapticsContextValue>(
    () => ({
      enabled,
      trigger: (preset = "tap") => {
        if (!enabled) return
        // fire-and-forget — feedback must never block or throw into the UI.
        try {
          void fire(INTENSITY[preset])
        } catch {
          // no haptics available — stay silent
        }
      },
    }),
    [enabled, fire]
  )

  return (
    <HapticsContext.Provider value={value}>{children}</HapticsContext.Provider>
  )
}

/** Read the ambient haptics channel. Safe without a provider (no-op). */
function useHaptics() {
  return React.useContext(HapticsContext)
}

export { HapticsProvider, useHaptics, type HapticPreset }
