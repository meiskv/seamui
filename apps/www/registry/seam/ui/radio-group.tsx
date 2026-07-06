"use client"

import * as React from "react"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import { Radio as BaseRadio } from "@base-ui/react/radio"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs, fades, reduced } from "@/lib/motion"

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
        // debossed ring — the well is carved in; the checked dot rides in it.
        "flex aspect-square size-4.5 items-center justify-center rounded-full border border-border/60 bg-muted shadow-well outline-none",
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
            initial={reduceMotion ? reduced.fadeIn.initial : { scale: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={reduceMotion ? fades.fast : springs.snappy}
          />
        }
      >
        {/* embossed dot — a raised key sitting in the debossed ring. */}
        <span className="bg-primary shadow-resting size-2 rounded-full" />
      </BaseRadio.Indicator>
    </BaseRadio.Root>
  )
}

export { RadioGroup, RadioGroupItem }
