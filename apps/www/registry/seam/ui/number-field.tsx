"use client"

import type * as React from "react"
import { NumberField as BaseNumberField } from "@base-ui/react/number-field"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

// Steppers dogfood the foundation: a ghost icon Button (base classes, focus
// ring, disabled + press depth for free). Only the shape is overridden — square
// inner corners and a divider so the pair reads as one control in the well.
const stepperClass = "text-muted-foreground size-10 rounded-none border-input"

function NumberField({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Root>) {
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
          render={
            <Button
              variant="ghost"
              size="icon"
              className={cn(stepperClass, "rounded-l-md border-r")}
            />
          }
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
          render={
            <Button
              variant="ghost"
              size="icon"
              className={cn(stepperClass, "rounded-r-md border-l")}
            />
          }
          aria-label="Increase"
        >
          <Plus />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  )
}

export { NumberField }
