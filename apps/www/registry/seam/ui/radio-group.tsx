"use client"

import * as React from "react"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import { Radio as BaseRadio } from "@base-ui/react/radio"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs } from "@/lib/motion"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseRadioGroup>) {
  return (
    <BaseRadioGroup
      data-slot="radio-group"
      className={cn("grid gap-2.5", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseRadio.Root>) {
  const reduceMotion = useReducedMotion()

  return (
    <BaseRadio.Root
      data-slot="radio-group-item"
      className={cn(
        "aspect-square size-4.5 rounded-full border border-input shadow-pressed outline-none",
        "data-[checked]:border-primary",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <BaseRadio.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
        render={
          // seam motion: the dot pops in with a snappy spring.
          <motion.span
            initial={reduceMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={springs.snappy}
          />
        }
      >
        <span className="bg-primary size-2 rounded-full" />
      </BaseRadio.Indicator>
    </BaseRadio.Root>
  )
}

export { RadioGroup, RadioGroupItem }
