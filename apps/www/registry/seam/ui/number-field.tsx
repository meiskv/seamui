"use client"

import * as React from "react"
import { NumberField as BaseNumberField } from "@base-ui/react/number-field"
import { motion, useReducedMotion } from "motion/react"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced } from "@/lib/motion"

const stepperClass =
  "flex h-10 w-10 items-center justify-center border-input text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4"

function NumberField({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Root>) {
  const reduceMotion = useReducedMotion()
  // Base UI keeps native <button> semantics via render; motion supplies the
  // press depth — a dim instead of movement under reduced motion.
  const stepperMotion = (
    <motion.button
      whileTap={reduceMotion ? reduced.pressed : depth.pressed}
      transition={reduceMotion ? fades.fast : springs.press}
    />
  )

  return (
    <BaseNumberField.Root data-slot="number-field" {...props}>
      <BaseNumberField.Group
        data-slot="number-field-group"
        className={cn(
          "inline-flex items-center rounded-md squircle border border-border/60 bg-muted shadow-well",
          className
        )}
      >
        <BaseNumberField.Decrement
          data-slot="number-field-decrement"
          className={cn(stepperClass, "rounded-l-md border-r")}
          render={stepperMotion}
          aria-label="Decrease"
        >
          <Minus />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input
          data-slot="number-field-input"
          className="h-10 w-16 bg-transparent text-center text-sm tabular-nums outline-none"
        />
        <BaseNumberField.Increment
          data-slot="number-field-increment"
          className={cn(stepperClass, "rounded-r-md border-l")}
          render={stepperMotion}
          aria-label="Increase"
        >
          <Plus />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  )
}

export { NumberField }
