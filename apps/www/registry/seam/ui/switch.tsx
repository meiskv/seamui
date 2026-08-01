"use client"

import type * as React from "react"
import { Switch as BaseSwitch } from "@base-ui/react/switch"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  springs,
  fades,
  reduced,
  useMounted,
  useReducedMotion,
} from "@/lib/motion"
import { useHaptics } from "@/lib/haptics"

const MotionThumb = motion.create(BaseSwitch.Thumb)

type SwitchSize = "default" | "sm"

/**
 * Track/thumb geometry per size. The thumb's rest and pressed widths live here
 * too, because the press-stretch is an inline motion value (px) — a CSS class
 * alone can't scale it, and mismatched pairs distort the thumb.
 */
const SIZES: Record<
  SwitchSize,
  { track: string; thumb: string; rest: number; pressed: number }
> = {
  default: { track: "h-5 w-9", thumb: "size-4", rest: 16, pressed: 20 },
  sm: { track: "h-4 w-7", thumb: "size-3", rest: 12, pressed: 15 },
}

function Switch({
  className,
  disabled,
  onCheckedChange,
  size = "default",
  ...props
}: React.ComponentProps<typeof BaseSwitch.Root> & { size?: SwitchSize }) {
  const geometry = SIZES[size]
  const reduceMotion = useReducedMotion()
  const { trigger } = useHaptics()
  // Defer motion's animated inline styles until after hydration: the width
  // variant below serializes `width:16px` on the server that the client's
  // first paint doesn't emit (the `size-4` class already sets it), so SSR and
  // client disagree. Gating on mount lets the rest state fall back to the CSS
  // width during hydration; the press-stretch still springs post-mount.
  const mounted = useMounted()

  return (
    <BaseSwitch.Root
      data-slot="switch"
      disabled={disabled}
      // the render element below IS a native <button> — tell Base UI, since a
      // custom render flips its default to "assume non-button".
      nativeButton
      // tactile feedback: a tick as the state commits (no-op sans provider).
      onCheckedChange={(
        ...args: Parameters<NonNullable<typeof onCheckedChange>>
      ) => {
        trigger("tick")
        onCheckedChange?.(...args)
      }}
      // seam touch feedback: while pressed the thumb *stretches* toward the
      // far side (the "pressed" variant propagates down to the thumb), then
      // snaps across on release — the iOS switch feel. Under reduced motion
      // the press dims instead; the thumb still jumps states via layout.
      render={
        <motion.button
          initial={false}
          animate="rest"
          whileTap={
            disabled ? undefined : reduceMotion ? reduced.pressed : "pressed"
          }
          transition={reduceMotion ? fades.fast : springs.press}
        />
      }
      className={cn(
        // track — the thumb rides from left to right via the flex justify swap.
        "inline-flex shrink-0 items-center rounded-full p-0.5 outline-none",
        geometry.track,
        "bg-input data-[checked]:bg-primary",
        "justify-start data-[checked]:justify-end",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <MotionThumb
        data-slot="switch-thumb"
        // seam motion: `layout` springs the thumb when justify flips on toggle.
        layout
        // width geometry for the press stretch (16 = size-4 at rest); the
        // justify pin means growth always heads toward the far side. Applied
        // only after mount so the resting width comes from CSS during SSR/
        // hydration (avoids the serialized-inline-style mismatch).
        variants={
          mounted && !reduceMotion
            ? {
                rest: { width: geometry.rest },
                pressed: { width: geometry.pressed },
              }
            : undefined
        }
        transition={reduceMotion ? reduced.instant : springs.snappy}
        className={cn("bg-card rounded-full shadow-resting", geometry.thumb)}
      />
    </BaseSwitch.Root>
  )
}

export { Switch }
