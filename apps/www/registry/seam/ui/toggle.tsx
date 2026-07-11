"use client"

import * as React from "react"
import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import { motion, useReducedMotion } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced } from "@/lib/motion"
import { useHaptics, type HapticPreset } from "@/lib/haptics"

const toggleVariants = cva(
  // pressed-on state rises as a white key out of the surface (seam design language).
  "inline-flex items-center justify-center gap-2 rounded-md squircle text-sm font-medium outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-secondary data-[pressed]:text-secondary-foreground data-[pressed]:shadow-resting [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-accent hover:text-accent-foreground",
        outline:
          "border border-border/60 bg-transparent shadow-pressed hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 min-w-10 px-3",
        sm: "h-9 min-w-9 px-2.5 text-xs",
        lg: "h-11 min-w-11 px-3.5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface ToggleProps
  extends Omit<React.ComponentProps<typeof BaseToggle>, "render">,
    VariantProps<typeof toggleVariants> {
  /** Haptic on press when a HapticsProvider is mounted: `true` = "tap",
   *  a preset name to override, `false` to opt out. */
  haptic?: boolean | HapticPreset
}

function Toggle({
  className,
  variant,
  size,
  disabled,
  haptic = true,
  onPointerDown,
  ...props
}: ToggleProps) {
  const reduceMotion = useReducedMotion()
  const { trigger } = useHaptics()

  return (
    <BaseToggle
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      disabled={disabled}
      onPointerDown={(e) => {
        onPointerDown?.(e)
        if (haptic && !disabled && e.button === 0) {
          trigger(haptic === true ? "tap" : haptic)
        }
      }}
      // Base UI keeps native <button> semantics; motion supplies press depth.
      render={
        <motion.button
          whileTap={
            disabled ? undefined : reduceMotion ? reduced.pressed : depth.pressed
          }
          transition={reduceMotion ? fades.fast : springs.press}
        />
      }
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
