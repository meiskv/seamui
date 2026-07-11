"use client"

import * as React from "react"
import { Switch as BaseSwitch } from "@base-ui/react/switch"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs, fades, reduced } from "@/lib/motion"

const MotionThumb = motion.create(BaseSwitch.Thumb)

function Switch({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof BaseSwitch.Root>) {
  const reduceMotion = useReducedMotion()

  return (
    <BaseSwitch.Root
      data-slot="switch"
      disabled={disabled}
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
