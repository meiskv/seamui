// seamui motion tokens — the single source of truth for all animation.
// Springs over durations; depth over flatness. See seamui docs → Motion.
import type { TargetAndTransition, Transition } from "motion/react"

/**
 * ── Personality: retune the whole library in one line ────────────────
 * Every seamui animation pulls its spring from `springs`, and `springs`
 * just picks a personality below. Swap the pick — or edit the numbers —
 * and all components change feel together; no component files to touch.
 *
 * Each personality defines the same four roles:
 *   press   — press-down feedback: near-instant
 *   snappy  — release / settle / state changes
 *   surface — overlays entering (dialogs, popovers, sheets)
 *   bouncy  — playful accents (toasts, badges); use sparingly
 */
export const personalities = {
  /** The seam default — quick and physical, with a hint of life. */
  seam: {
    press: { type: "spring", stiffness: 600, damping: 40, mass: 0.5 },
    snappy: { type: "spring", stiffness: 420, damping: 30, mass: 0.7 },
    surface: { type: "spring", stiffness: 320, damping: 28, mass: 0.9 },
    bouncy: { type: "spring", stiffness: 380, damping: 18, mass: 0.9 },
  },
  /** Tighter and faster, no overshoot — dense professional tools. */
  brisk: {
    press: { type: "spring", stiffness: 800, damping: 50, mass: 0.4 },
    snappy: { type: "spring", stiffness: 560, damping: 40, mass: 0.55 },
    surface: { type: "spring", stiffness: 440, damping: 38, mass: 0.7 },
    bouncy: { type: "spring", stiffness: 500, damping: 26, mass: 0.7 },
  },
  /** Softer and slower — calm, editorial surfaces. */
  relaxed: {
    press: { type: "spring", stiffness: 420, damping: 36, mass: 0.7 },
    snappy: { type: "spring", stiffness: 280, damping: 28, mass: 0.9 },
    surface: { type: "spring", stiffness: 220, damping: 26, mass: 1.1 },
    bouncy: { type: "spring", stiffness: 260, damping: 18, mass: 1 },
  },
  /** More overshoot everywhere — playful, consumer-facing apps. */
  playful: {
    press: { type: "spring", stiffness: 620, damping: 30, mass: 0.5 },
    snappy: { type: "spring", stiffness: 420, damping: 20, mass: 0.8 },
    surface: { type: "spring", stiffness: 340, damping: 18, mass: 0.9 },
    bouncy: { type: "spring", stiffness: 400, damping: 12, mass: 1 },
  },
} as const satisfies Record<
  string,
  Record<"press" | "snappy" | "surface" | "bouncy", Transition>
>

/** Spring presets, tuned against 60fps mobile feel. Pick a personality here. */
export const springs = personalities.seam

/** Opacity-only fades (the one place plain durations are allowed). */
export const fades = {
  fast: { duration: 0.12, ease: "easeOut" },
  normal: { duration: 0.2, ease: "easeOut" },
} as const satisfies Record<string, Transition>

/**
 * Depth scale — virtual z-axis positions expressed as scale + shadow pairs.
 * pressed  : element pushed into the surface
 * resting  : neutral
 * raised   : hover/lifted state
 * overlay  : floating surfaces (popover, dropdown)
 * modal    : top-of-stack surfaces (dialog, sheet)
 */
export const depth = {
  pressed: { scale: 0.97 },
  resting: { scale: 1 },
  raised: { scale: 1.02 },
  overlay: {
    initial: { opacity: 0, scale: 0.96, y: 4 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: 2 },
  },
  modal: {
    initial: { opacity: 0, scale: 0.96, y: 8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.97, y: 6 },
  },
} as const

/**
 * Error feedback — a brief horizontal shake. A keyframe sequence a spring
 * can't express, so it carries its own duration (like fades). Movement, so
 * it never runs under reduced motion — pair with `reduced.flash`.
 */
export const shake: { animate: TargetAndTransition; transition: Transition } = {
  animate: { x: [0, -6, 6, -4, 4, 0] },
  transition: { duration: 0.32, ease: "easeInOut" },
}

/**
 * Reduced-motion fallbacks — used when `useReducedMotion()` is true.
 * Policy: never go dead. Swap movement (scale/translate) for opacity so
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
  instant: { duration: 0 } satisfies Transition,
  /** Error/attention feedback without movement: a brief opacity pulse. */
  flash: {
    animate: { opacity: [1, 0.45, 1] },
    transition: { duration: 0.32, ease: "easeInOut" },
  } as { animate: TargetAndTransition; transition: Transition },
} as const
