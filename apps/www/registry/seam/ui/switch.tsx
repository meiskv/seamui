"use client"

import type * as React from "react"
import { Switch as BaseSwitch } from "@base-ui/react/switch"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs, fades, reduced } from "@/lib/motion"
import { useHaptics } from "@/lib/haptics"

const MotionThumb = motion.create(BaseSwitch.Thumb)

function Switch({
  className,
  disabled,
  onCheckedChange,
  ...props
}: React.ComponentProps<typeof BaseSwitch.Root>) {
  const reduceMotion = useReducedMotion()
  const { trigger } = useHaptics()

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
        "inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 outline-none",
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
        // justify pin means growth always heads toward the far side.
        variants={
          reduceMotion
            ? undefined
            : { rest: { width: 16 }, pressed: { width: 20 } }
        }
        transition={reduceMotion ? reduced.instant : springs.snappy}
        className="bg-card size-4 rounded-full shadow-resting"
      />
    </BaseSwitch.Root>
  )
}

export { Switch }
