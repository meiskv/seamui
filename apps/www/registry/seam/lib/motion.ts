// seamui motion tokens — the single source of truth for all animation.
// Springs over durations; depth over flatness. See seamui docs → Motion.
import * as React from "react"
import { animate, useReducedMotion } from "motion/react"
import type { TargetAndTransition, Transition } from "motion/react"

/**
 * True only after the first client render. Gate a motion `initial` that moves
 * (scale/translate) behind this so SSR and the client's first paint agree —
 * motion serializes an animated `initial` transform on the server that the
 * client's hydration doesn't, which trips React's hydration-mismatch warning.
 * Elements that mount *after* hydration (a new chat message, an added chip)
 * still get their entrance, since `initial` applies on mount.
 *
 *   const mounted = useMounted()
 *   initial={mounted ? (reduceMotion ? reduced.fadeIn.initial : depth.overlay.initial) : false}
 *
 * Opacity-only `initial` (e.g. `{ opacity: 0 }`) doesn't need this — no
 * transform is serialized, so server and client already agree.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return mounted
}

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
 * overlay  : floating surfaces rising with overlay depth
 * modal    : top-of-stack surfaces
 *
 * overlay/modal are for elements **motion.dev controls end to end** — list
 * entries, chips, a scroll-to-bottom button (AnimatePresence owns their
 * mount/unmount, so `exit` runs). Base UI popups do NOT use these: Base UI
 * owns their lifecycle and awaits CSS—not motion's rAF springs—before
 * unmounting, so those use `condense` below instead.
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
 * Drill-down — moving between levels of a single surface (the nested dropdown
 * menu). Unlike `depth`, nothing changes z-position: the level you're entering
 * slides in laterally from the direction of travel while the surface springs to
 * its new size around it. `direction` is 1 drilling in, -1 stepping back.
 *
 * Only the level being entered animates. Its predecessor is unmounted the
 * instant the path changes — a menu is a roving-focus composite, and a level
 * that lingers to animate out is a level whose items are still registered for
 * arrow keys. Movement here is deliberately short: the size spring carries the
 * transition, the slide only says which way you went.
 *
 * Reduced motion drops the travel and keeps the fade — use `reduced.fadeIn`.
 */
export const drill = {
  /** Entry offset for the incoming level, in px, signed by travel direction. */
  enter: (direction: 1 | -1): TargetAndTransition => ({
    opacity: 0,
    x: direction * 14,
  }),
  /** Settled: flush with the surface. */
  settle: { opacity: 1, x: 0 } satisfies TargetAndTransition,
} as const

/**
 * The seam "condense" — how every Base UI overlay animates: rise + fade in,
 * fall back + fade out, backdrop dimming on the same clock. In CSS (keyed to
 * Base UI's `data-starting-style` / `data-ending-style`) because Base UI keeps
 * a popup mounted through its exit and awaits CSS transitions before
 * unmounting — it can't await motion's rAF springs, which is why exits used to
 * cut instantly. Scale rides the standalone `scale` property (Base UI owns
 * `transform` for positioning, so a transform-based scale would be clobbered);
 * a spring-shaped bezier keeps the seam bounce. The one place seam expresses
 * motion as classes — because Base UI's lifecycle is CSS-native.
 */
export const condense = {
  /** Popup surfaces: rise + fade from the trigger, fall back quicker on exit.
   *  Scale originates from Base UI's `--transform-origin` (the trigger side),
   *  so overlay-depth popups grow toward the user out of their anchor. */
  surface:
    "origin-[var(--transform-origin)] transition-[opacity,scale] duration-200 ease-[cubic-bezier(0.22,1.3,0.36,1)] data-[starting-style]:opacity-0 data-[starting-style]:[scale:0.95] data-[ending-style]:opacity-0 data-[ending-style]:[scale:0.96] data-[ending-style]:duration-150 data-[ending-style]:ease-out motion-reduce:transition-opacity motion-reduce:data-[starting-style]:[scale:1] motion-reduce:data-[ending-style]:[scale:1]",
  /** Backdrops / scrims: same clock as the panel, no transform. */
  backdrop:
    "transition-opacity duration-200 ease-out data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 data-[ending-style]:duration-150",
  /** Bottom sheet: slides up from off-screen and fades in, falls back down on
   *  dismiss (Base UI awaits it). The slide rides the standalone `translate`
   *  property because Base UI owns `transform` for the swipe — keyed to
   *  `data-starting-style`/`data-ending-style`, and self-suppressed mid-drag so
   *  the gesture stays 1:1. */
  sheet:
    "transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[starting-style]:translate-y-full data-[starting-style]:opacity-0 data-[ending-style]:translate-y-full data-[ending-style]:opacity-0 data-[dragging]:transition-none motion-reduce:transition-opacity motion-reduce:data-[starting-style]:translate-y-0 motion-reduce:data-[ending-style]:translate-y-0",
  /** Toast: rises + fades in with the seam bounce, falls back + fades quicker
   *  on dismiss. Base UI owns the stacking `transform` and swipe, so the
   *  entrance/exit offset rides `transform` here alongside opacity; the swipe
   *  exit self-cancels the vertical fall so the gesture direction wins. */
  toast:
    "[transition:transform_0.5s,opacity_0.35s] ease-[cubic-bezier(0.22,1.3,0.36,1)] data-[starting-style]:translate-y-6 data-[starting-style]:opacity-0 data-[ending-style]:translate-y-4 data-[ending-style]:opacity-0 data-[ending-style]:[&[data-swipe-direction]]:translate-y-0 motion-reduce:[transition:opacity_0.35s] motion-reduce:data-[starting-style]:translate-y-0 motion-reduce:data-[ending-style]:translate-y-0",
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

type PressableProps = {
  onPointerDown?: React.PointerEventHandler<HTMLElement>
  onPointerUp?: React.PointerEventHandler<HTMLElement>
  onPointerCancel?: React.PointerEventHandler<HTMLElement>
  onPointerLeave?: React.PointerEventHandler<HTMLElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>
  onKeyUp?: React.KeyboardEventHandler<HTMLElement>
}

/**
 * Imperative press depth for controls whose rendered element must stay a
 * plain DOM node. Base UI composite widgets (Toolbar, Toggle Group, Tabs,
 * Menubar) register items and rove focus through the element's ref, and a
 * motion component in that render path breaks the registration — even
 * `render={<motion.button/>}` leaves arrow-key navigation dead. So
 * composite items press via motion's imperative `animate()` on the plain
 * element instead (same tokens, same feel).
 *
 * Returns a props merger: wrap the (Base UI-provided) render props and the
 * element presses into the surface on pointer/keyboard activation and
 * settles springy on release. Reduced motion dims instead of moving (§5b).
 *
 *   const withPress = usePressDepth(disabled)
 *   render={(props) => <button {...withPress(props)} />}
 */
export function usePressDepth(disabled = false) {
  const reduceMotion = useReducedMotion() ?? false

  return React.useCallback(
    <P extends PressableProps>(props: P): P => {
      const press = (el: HTMLElement) => {
        if (disabled) return
        if (reduceMotion) animate(el, reduced.pressed, fades.fast)
        else animate(el, depth.pressed, springs.press)
      }
      const settle = (el: HTMLElement) => {
        if (disabled) return
        if (reduceMotion) animate(el, { opacity: 1 }, fades.fast)
        else animate(el, depth.resting, springs.snappy)
      }
      return {
        ...props,
        onPointerDown: (e) => {
          props.onPointerDown?.(e)
          if (e.button === 0) press(e.currentTarget)
        },
        onPointerUp: (e) => {
          props.onPointerUp?.(e)
          settle(e.currentTarget)
        },
        onPointerCancel: (e) => {
          props.onPointerCancel?.(e)
          settle(e.currentTarget)
        },
        onPointerLeave: (e) => {
          props.onPointerLeave?.(e)
          settle(e.currentTarget)
        },
        // Feedback must fire on keyboard activation too (§1).
        onKeyDown: (e) => {
          props.onKeyDown?.(e)
          if (!e.repeat && (e.key === " " || e.key === "Enter"))
            press(e.currentTarget)
        },
        onKeyUp: (e) => {
          props.onKeyUp?.(e)
          if (e.key === " " || e.key === "Enter") settle(e.currentTarget)
        },
      }
    },
    [disabled, reduceMotion]
  )
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
