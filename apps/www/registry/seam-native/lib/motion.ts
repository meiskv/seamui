// seamui native motion tokens — the single source of truth for animation on
// React Native, the peer of registry/seam/lib/motion.ts (web / motion.dev).
//
// Same names, same feel, different engine: motion.dev has no React Native
// support, so native runs on **react-native-reanimated 4** (`withSpring` /
// `withTiming`). The spring physics is the same damped-harmonic-oscillator
// model, so the `personalities` numbers are ported VERBATIM from web — retune
// the whole library by swapping the `springs` pick, exactly as on web.
//
// One deliberate divergence from web, per NATIVE.md §3: there is **no
// `condense`**. That token exists only because Base UI awaits CSS transitions
// before unmounting an overlay. On native, Reanimated owns mount/unmount, so
// overlay EXITS are allowed to spring — build them from `depth.overlay` /
// `depth.modal` with `entering`/`exiting` (or shared values). If you reach for
// a `data-starting-style` string here, stop: that's the web pattern.
import { Easing, ReduceMotion } from "react-native-reanimated"
import type {
  WithSpringConfig,
  WithTimingConfig,
} from "react-native-reanimated"

/**
 * ── Personality: retune the whole library in one line ────────────────
 * Every seamui spring pulls from `springs`, and `springs` just picks a
 * personality below. Numbers are identical to the web tokens.
 *
 *   press   — press-down feedback: near-instant
 *   snappy  — release / settle / state changes
 *   surface — overlays entering (dialogs, popovers, sheets)
 *   bouncy  — playful accents (toasts, badges); use sparingly
 *
 * `reduceMotion: ReduceMotion.System` is baked into every config so the OS
 * setting is honored even if a component forgets to branch — but that alone
 * snaps to the end state, so components STILL branch to `reduced.*` for
 * feedback parity (NATIVE.md §6). Reanimated 4's default spring changed, so we
 * always pass explicit configs; rest detection is Reanimated's `energyThreshold`
 * (default is fine for these — tune here, never per component).
 */
type SpringRoles = "press" | "snappy" | "surface" | "bouncy"

const withSystemReduceMotion = <T extends WithSpringConfig | WithTimingConfig>(
  config: T
): T => ({ ...config, reduceMotion: ReduceMotion.System })

function personality(
  roles: Record<
    SpringRoles,
    { stiffness: number; damping: number; mass: number }
  >
): Record<SpringRoles, WithSpringConfig> {
  return {
    press: withSystemReduceMotion(roles.press),
    snappy: withSystemReduceMotion(roles.snappy),
    surface: withSystemReduceMotion(roles.surface),
    bouncy: withSystemReduceMotion(roles.bouncy),
  }
}

export const personalities = {
  /** The seam default — quick and physical, with a hint of life. */
  seam: personality({
    press: { stiffness: 600, damping: 40, mass: 0.5 },
    snappy: { stiffness: 420, damping: 30, mass: 0.7 },
    surface: { stiffness: 320, damping: 28, mass: 0.9 },
    bouncy: { stiffness: 380, damping: 18, mass: 0.9 },
  }),
  /** Tighter and faster, no overshoot — dense professional tools. */
  brisk: personality({
    press: { stiffness: 800, damping: 50, mass: 0.4 },
    snappy: { stiffness: 560, damping: 40, mass: 0.55 },
    surface: { stiffness: 440, damping: 38, mass: 0.7 },
    bouncy: { stiffness: 500, damping: 26, mass: 0.7 },
  }),
  /** Softer and slower — calm, editorial surfaces. */
  relaxed: personality({
    press: { stiffness: 420, damping: 36, mass: 0.7 },
    snappy: { stiffness: 280, damping: 28, mass: 0.9 },
    surface: { stiffness: 220, damping: 26, mass: 1.1 },
    bouncy: { stiffness: 260, damping: 18, mass: 1 },
  }),
  /** More overshoot everywhere — playful, consumer-facing apps. */
  playful: personality({
    press: { stiffness: 620, damping: 30, mass: 0.5 },
    snappy: { stiffness: 420, damping: 20, mass: 0.8 },
    surface: { stiffness: 340, damping: 18, mass: 0.9 },
    bouncy: { stiffness: 400, damping: 12, mass: 1 },
  }),
} as const

/** Spring presets, tuned against 60fps mobile feel. Pick a personality here. */
export const springs = personalities.seam

/**
 * Opacity-only fades — the one place plain durations are allowed (as on web).
 * Web uses seconds (motion.dev); Reanimated `withTiming` takes milliseconds.
 */
export const fades = {
  fast: withSystemReduceMotion({
    duration: 120,
    easing: Easing.out(Easing.ease),
  }),
  normal: withSystemReduceMotion({
    duration: 200,
    easing: Easing.out(Easing.ease),
  }),
} as const satisfies Record<string, WithTimingConfig>

/**
 * Depth scale — virtual z-axis targets. Identical scalars to web.
 *   pressed : pushed into the surface   resting : neutral   raised : lifted
 * `overlay` / `modal` are enter/exit target sets: feed `initial → animate` with
 * `springs.surface` on enter, `animate → exit` on exit. Unlike web these DO run
 * their exit (Reanimated owns unmount). `translateY` replaces web's `y`.
 */
export const depth = {
  pressed: { scale: 0.97 },
  resting: { scale: 1 },
  raised: { scale: 1.02 },
  overlay: {
    initial: { opacity: 0, scale: 0.96, translateY: 4 },
    animate: { opacity: 1, scale: 1, translateY: 0 },
    exit: { opacity: 0, scale: 0.98, translateY: 2 },
  },
  modal: {
    initial: { opacity: 0, scale: 0.96, translateY: 8 },
    animate: { opacity: 1, scale: 1, translateY: 0 },
    exit: { opacity: 0, scale: 0.97, translateY: 6 },
  },
} as const

/**
 * Error feedback — a brief horizontal shake, as a keyframe sequence a spring
 * can't express (drive translateX through these with a short timing loop).
 * Movement, so it never runs under reduced motion — pair with `reduced.flash`.
 */
export const shake = {
  keyframes: [0, -6, 6, -4, 4, 0],
  duration: 320,
} as const

/**
 * Reduced-motion fallbacks — used when Reanimated's `useReducedMotion()` is
 * true. Policy (NATIVE.md §6): never go dead. Swap movement for opacity so
 * every interaction still gives feedback; it just doesn't travel.
 */
export const reduced = {
  /** Press feedback without movement: a brief dim. */
  pressed: { opacity: 0.7 },
  /** Entrances collapse to opacity-only fades. */
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  /** Layout / position changes jump instantly instead of springing. */
  instant: withSystemReduceMotion({ duration: 0 }) satisfies WithTimingConfig,
  /** Error/attention feedback without movement: a brief opacity pulse. */
  flash: {
    keyframes: [1, 0.45, 1],
    duration: 320,
  },
} as const
