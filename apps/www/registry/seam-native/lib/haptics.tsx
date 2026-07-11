// seamui native haptics — the tactile third of the touch-feedback pillar, the
// peer of registry/seam/lib/haptics.tsx (web / web-haptics).
//
// Same contract as web: mount <HapticsProvider> once around your app shell and
// every seamui control taps and ticks as you use it. Without a provider every
// trigger is a silent no-op, so components always call the hook unconditionally.
// The engine is the only difference — real device haptics via `expo-haptics`
// (a strict upgrade over web's Vibration hack). Fire-and-forget: never awaited,
// never throws into the UI, never gates on reduced motion (haptics aren't
// motion).
import * as Haptics from "expo-haptics"
import * as React from "react"

type HapticPreset = "tap" | "tick" | "success" | "error"

type HapticsContextValue = {
  enabled: boolean
  /** Fire a haptic. Never throws, never blocks. */
  trigger: (preset?: HapticPreset) => void
}

const HapticsContext = React.createContext<HapticsContextValue>({
  enabled: false,
  trigger: () => {},
})

/** seam presets → expo-haptics calls (NATIVE.md §4). `tick` uses the
 *  cross-platform selection tick; refine to `performAndroidHapticsAsync`
 *  (e.g. a segment tick) per-control where finer grain is wanted, e.g. slider. */
function fire(preset: HapticPreset): Promise<void> {
  switch (preset) {
    case "tap":
      return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    case "tick":
      return Haptics.selectionAsync()
    case "success":
      return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    case "error":
      return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
  }
}

function HapticsProvider({
  enabled = true,
  children,
}: {
  enabled?: boolean
  children: React.ReactNode
}) {
  const value = React.useMemo<HapticsContextValue>(
    () => ({
      enabled,
      trigger: (preset = "tap") => {
        if (!enabled) return
        // fire-and-forget — feedback must never block or throw into the UI.
        try {
          void fire(preset)
        } catch {
          // no haptics engine available — stay silent
        }
      },
    }),
    [enabled]
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
