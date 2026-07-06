"use client"

import * as React from "react"
import { NumberField as BaseNumberField } from "@base-ui/react/number-field"
import { motion, useReducedMotion } from "motion/react"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { springs, depth } from "@/lib/motion"

const MotionIncrement = motion.create(BaseNumberField.Increment)
const MotionDecrement = motion.create(BaseNumberField.Decrement)

const stepperClass =
  "flex h-9 w-9 items-center justify-center border-input text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4"

function NumberField({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Root>) {
  const reduceMotion = useReducedMotion()
  const tap = reduceMotion ? undefined : depth.pressed

  return (
    <BaseNumberField.Root data-slot="number-field" {...props}>
      <BaseNumberField.Group
        data-slot="number-field-group"
        className={cn(
          "inline-flex items-center rounded-md border border-input shadow-pressed",
          className
        )}
      >
        <MotionDecrement
          data-slot="number-field-decrement"
          className={cn(stepperClass, "rounded-l-md border-r")}
          whileTap={tap}
          transition={springs.press}
          aria-label="Decrease"
        >
          <Minus />
        </MotionDecrement>
        <BaseNumberField.Input
          data-slot="number-field-input"
          className="h-9 w-16 bg-transparent text-center text-sm tabular-nums outline-none"
        />
        <MotionIncrement
          data-slot="number-field-increment"
          className={cn(stepperClass, "rounded-r-md border-l")}
          whileTap={tap}
          transition={springs.press}
          aria-label="Increase"
        >
          <Plus />
        </MotionIncrement>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  )
}

export { NumberField }
