"use client"

import * as React from "react"
import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import { motion, useReducedMotion } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { springs, depth } from "@/lib/motion"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-accent data-[pressed]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-muted hover:text-muted-foreground",
        outline:
          "border border-input bg-transparent shadow-pressed hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 min-w-9 px-2.5",
        sm: "h-8 min-w-8 px-2 text-xs",
        lg: "h-10 min-w-10 px-3",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

const MotionToggle = motion.create(BaseToggle)

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof MotionToggle>,
    VariantProps<typeof toggleVariants> {}

function Toggle({ className, variant, size, disabled, ...props }: ToggleProps) {
  const reduceMotion = useReducedMotion()

  return (
    <MotionToggle
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      disabled={disabled}
      whileTap={reduceMotion || disabled ? undefined : depth.pressed}
      transition={springs.press}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
