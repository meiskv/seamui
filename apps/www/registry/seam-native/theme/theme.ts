// seamui native theme — the platform-neutral token source for React Native.
//
// The web theme (registry/seam/theme/theme.css) expresses these same tokens as
// CSS custom properties in oklch. React Native can't parse oklch and has no CSS
// cascade, so the native build ships the tokens as plain data:
//   • colors  — precomputed from the canonical oklch values to hex / rgba
//   • radii   — numbers (px), from the rem scale ×16
//   • shadows — RN `boxShadow` strings (New Architecture; layered + `inset`)
//
// Keep this in lockstep with theme.css: the values below are GENERATED from the
// same oklch source (see the epic's token-drift gate, #53). Don't hand-tune a
// single side — change the source and regenerate both.
//
// Consumption: a Uniwind `@theme` config (or a ThemeProvider) maps these onto
// classnames; components may also read them directly. `colors` carry a light
// and dark set — pick with `useColorScheme()`, never a `.dark` class.

/** Depth shadows as RN `boxShadow` strings. Faithful to the web oklch shadows
 *  (base ink = rgb(29,29,31); dark = black). Caveats to design around:
 *   • `inset` needs Android 10+; negative spread renders unevenly on Android —
 *     fall back to a 1px border + tint on old Android (see NATIVE.md §2).
 *   • Android rasterizes blur differently from iOS; re-tune by eye on device. */
const shadows = {
  light: {
    pressed: "0 1px 1px 0 rgba(29,29,31,0.04)",
    resting:
      "0 1px 2px 0 rgba(29,29,31,0.05), 0 2px 6px -1px rgba(29,29,31,0.06)",
    raised:
      "0 2px 4px -1px rgba(29,29,31,0.06), 0 6px 14px -3px rgba(29,29,31,0.08)",
    overlay:
      "0 4px 10px -2px rgba(29,29,31,0.08), 0 16px 32px -6px rgba(29,29,31,0.12)",
    modal:
      "0 8px 20px -4px rgba(29,29,31,0.12), 0 32px 64px -12px rgba(29,29,31,0.16)",
    well: "inset 0 1px 2px 0 rgba(29,29,31,0.05), inset 0 2px 4px 0 rgba(29,29,31,0.03)",
  },
  dark: {
    pressed: "0 1px 1px 0 rgba(0,0,0,0.3)",
    resting: "0 1px 2px 0 rgba(0,0,0,0.4), 0 2px 6px -1px rgba(0,0,0,0.45)",
    raised: "0 2px 4px -1px rgba(0,0,0,0.5), 0 6px 14px -3px rgba(0,0,0,0.5)",
    overlay:
      "0 4px 10px -2px rgba(0,0,0,0.6), 0 16px 32px -6px rgba(0,0,0,0.6)",
    modal: "0 8px 20px -4px rgba(0,0,0,0.7), 0 32px 64px -12px rgba(0,0,0,0.7)",
    well: "inset 0 1px 3px 0 rgba(0,0,0,0.35)",
  },
} as const

/** Color tokens, precomputed from the canonical oklch values (theme.css). */
const colors = {
  light: {
    background: "#fdfdfc",
    foreground: "#1d1d1f",
    card: "#ffffff",
    cardForeground: "#1d1d1f",
    popover: "#ffffff",
    popoverForeground: "#1d1d1f",
    primary: "#1f1f22",
    primaryForeground: "#fafaf9",
    secondary: "#ffffff",
    secondaryForeground: "#1d1d1f",
    muted: "#eeeeec",
    mutedForeground: "#696965",
    accent: "#e8e8e5",
    accentForeground: "#1d1d1f",
    destructive: "#e7000b",
    border: "#e0e0dd",
    input: "#e0e0dd",
    ring: "#a2a29e",
  },
  dark: {
    background: "#141416",
    foreground: "#f5f5f4",
    card: "#1e1e20",
    cardForeground: "#f5f5f4",
    popover: "#1e1e20",
    popoverForeground: "#f5f5f4",
    primary: "#ebebe9",
    primaryForeground: "#1a1a1d",
    secondary: "#353538",
    secondaryForeground: "#f5f5f4",
    muted: "#252528",
    mutedForeground: "#a5a5a2",
    accent: "#2a2a2c",
    accentForeground: "#f5f5f4",
    destructive: "#ff6467",
    border: "rgba(255,255,255,0.1)",
    input: "rgba(255,255,255,0.15)",
    ring: "#737373",
  },
} as const

/** Corner radii in px (web `--radius` = 0.875rem = 14px). Squircle smoothing is
 *  applied per-surface via `borderCurve: "continuous"` (+ a squircle lib for
 *  hero surfaces), not encoded here — see NATIVE.md §2. `full` stays a true
 *  circle for avatars / thumbs / dots. */
const radius = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 18,
  full: 9999,
} as const

export type SeamColorScheme = "light" | "dark"
export type SeamColorToken = keyof typeof colors.light
export type SeamShadowToken = keyof typeof shadows.light

export const tokens = { colors, shadows, radius } as const

/** Resolve the token set for a color scheme (from `useColorScheme()`). */
export function themeFor(scheme: SeamColorScheme) {
  return {
    colors: colors[scheme],
    shadows: shadows[scheme],
    radius,
  }
}
