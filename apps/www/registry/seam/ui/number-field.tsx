"use client"

import type * as React from "react"
import { NumberField as BaseNumberField } from "@base-ui/react/number-field"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

// Steppers dogfood the foundation: a ghost icon Button (base classes, focus
// ring, disabled + press depth + haptic tap for free). Only the shape is
// overridden — square inner corners and a divider so the pair reads as one
// control in the well.
const stepperClass = "text-muted-foreground size-10 rounded-none border-input"

function NumberField(props: React.ComponentProps<typeof BaseNumberField.Root>) {
  return <BaseNumberField.Root data-slot="number-field" {...props} />
}

// The debossed well the value + steppers sit in (seamui entry-field language).
function NumberFieldGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Group>) {
  return (
    <BaseNumberField.Group
      data-slot="number-field-group"
      className={cn(
        "inline-flex items-center rounded-md squircle border border-border/60 bg-muted shadow-well",
        className
      )}
      {...props}
    />
  )
}

// The editable value. Spread onto the real <input>, so this is where a
// consumer's `aria-label`/`id`/`name`/`placeholder` belong.
function NumberFieldInput({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Input>) {
  return (
    <BaseNumberField.Input
      data-slot="number-field-input"
      className={cn(
        "h-10 w-16 bg-transparent text-center text-sm tabular-nums outline-none",
        className
      )}
      {...props}
    />
  )
}

function NumberFieldDecrement({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Decrement>) {
  return (
    <BaseNumberField.Decrement
      data-slot="number-field-decrement"
      render={
        <Button
          variant="ghost"
          size="icon"
          className={cn(stepperClass, "rounded-l-md border-r", className)}
        />
      }
      aria-label="Decrease"
      {...props}
    >
      {children ?? <Minus />}
    </BaseNumberField.Decrement>
  )
}

function NumberFieldIncrement({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Increment>) {
  return (
    <BaseNumberField.Increment
      data-slot="number-field-increment"
      render={
        <Button
          variant="ghost"
          size="icon"
          className={cn(stepperClass, "rounded-r-md border-l", className)}
        />
      }
      aria-label="Increase"
      {...props}
    >
      {children ?? <Plus />}
    </BaseNumberField.Increment>
  )
}

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
}
