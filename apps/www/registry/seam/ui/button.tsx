"use client"

import * as React from "react"
import { Button as BaseButton } from "@base-ui/react/button"
import { motion, useReducedMotion } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { springs, depth } from "@/lib/motion"

const buttonVariants = cva(
  // base — no CSS transition classes; motion.dev owns transform/shadow.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-resting hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-resting hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-pressed hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-pressed hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-6",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

// Base UI Button composed with motion. motion.create() wraps any
// ref-forwarding component with animation props (whileTap, transition, …).
const MotionBase = motion.create(BaseButton)

/** Variants that sit flat on the surface don't animate depth on press. */
const FLAT_VARIANTS = new Set(["ghost", "link"])

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof MotionBase>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, disabled, ...props }: ButtonProps) {
  const reduceMotion = useReducedMotion()
  const animatesDepth =
    !reduceMotion && !disabled && !FLAT_VARIANTS.has(variant ?? "default")

  return (
    <MotionBase
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled}
      // seam motion: press recedes into the surface, release springs back.
      whileTap={animatesDepth ? depth.pressed : undefined}
      transition={springs.press}
      {...props}
    />
  )
}

export { Button, buttonVariants }
