"use client"

import * as React from "react"
import { Button as BaseButton } from "@base-ui/react/button"
import { motion, useReducedMotion } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced } from "@/lib/motion"

const buttonVariants = cva(
  // base — no CSS transition classes; motion.dev owns transform/shadow.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg squircle text-sm font-medium outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-resting hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-resting hover:bg-destructive/90",
        outline:
          "border border-border/60 bg-card shadow-resting hover:bg-secondary",
        // raised white "key" resting on the canvas (see seamui design language).
        secondary:
          "bg-secondary text-secondary-foreground shadow-resting hover:shadow-raised",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3.5 text-xs",
        lg: "h-11 rounded-lg px-7",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

/** Variants that sit flat on the surface don't animate depth on press. */
const FLAT_VARIANTS = new Set(["ghost", "link"])

// motion.create() per element type, cached so re-renders reuse components.
const motionTagCache = new Map<string, React.ElementType>()
const motionTypeCache = new WeakMap<object, React.ElementType>()
function asMotion(type: React.ElementType): React.ElementType {
  const cache = typeof type === "string" ? motionTagCache : motionTypeCache
  let cached = cache.get(type as never)
  if (!cached) {
    cached = motion.create(type as React.ComponentType) as React.ElementType
    cache.set(type as never, cached as never)
  }
  return cached
}

export interface ButtonProps
  extends React.ComponentProps<typeof BaseButton>,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  variant,
  size,
  disabled,
  render,
  ...props
}: ButtonProps) {
  const reduceMotion = useReducedMotion()
  const flat = FLAT_VARIANTS.has(variant ?? "default")

  // Base UI keeps native semantics (real <button>, or the caller's render
  // element, e.g. a <Link>); the motion wrapper supplies seam press feedback:
  // recede into the surface, spring back on release. Under reduced motion
  // the press dims instead of moving.
  const motionProps = {
    whileTap:
      disabled || flat
        ? undefined
        : reduceMotion
          ? reduced.pressed
          : depth.pressed,
    transition: reduceMotion ? fades.fast : springs.press,
  }

  let motionRender: React.ComponentProps<typeof BaseButton>["render"]
  if (render === undefined) {
    motionRender = <motion.button {...motionProps} />
  } else if (React.isValidElement(render)) {
    const MotionEl = asMotion(render.type as React.ElementType)
    motionRender = (
      <MotionEl {...(render.props as object)} {...motionProps} />
    )
  } else {
    // function-form render: pass through untouched (no press motion).
    motionRender = render
  }

  // Tell Base UI when the rendered element is not a real <button> (e.g. a
  // link) so it applies role/keyboard semantics instead of warning.
  const nativeButton =
    render === undefined ||
    (React.isValidElement(render) && render.type === "button")

  return (
    <BaseButton
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled}
      nativeButton={nativeButton}
      render={motionRender}
      {...props}
    />
  )
}

export { Button, buttonVariants }
