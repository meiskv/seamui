"use client"

import type * as React from "react"
import { Field as BaseField } from "@base-ui/react/field"
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset"

import { cn } from "@/lib/utils"
import { Input } from "./input"

// A labelled form row: label + control + description/error, auto-wired by Base
// UI (the label points at the control, errors get aria-describedby, validity
// flows to data-[invalid]). Drop a seam Input/Textarea/Select in as the control
// — they're Field-aware — or use <FieldControl/> for a styled input.

function Field({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Root>) {
  return (
    <BaseField.Root
      data-slot="field"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Label>) {
  return (
    <BaseField.Label
      data-slot="field-label"
      className={cn(
        "text-sm font-medium leading-none select-none data-[disabled]:opacity-70",
        className
      )}
      {...props}
    />
  )
}

// Renders the seam Input by default (dogfooding: debossed well, focus ring,
// invalid styling for free). Pass `render` to wire a Textarea/Select instead.
function FieldControl({
  render,
  ...props
}: React.ComponentProps<typeof BaseField.Control>) {
  return (
    <BaseField.Control
      data-slot="field-control"
      render={render ?? <Input />}
      {...props}
    />
  )
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Description>) {
  return (
    <BaseField.Description
      data-slot="field-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

// Only renders when the field is invalid (Base UI gates it on validity).
function FieldError({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Error>) {
  return (
    <BaseField.Error
      data-slot="field-error"
      className={cn("text-destructive text-sm", className)}
      {...props}
    />
  )
}

// Groups related fields under a shared legend (renders a real <fieldset>).
function Fieldset({
  className,
  ...props
}: React.ComponentProps<typeof BaseFieldset.Root>) {
  return (
    <BaseFieldset.Root
      data-slot="fieldset"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

function FieldsetLegend({
  className,
  ...props
}: React.ComponentProps<typeof BaseFieldset.Legend>) {
  return (
    <BaseFieldset.Legend
      data-slot="fieldset-legend"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

export {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
  Fieldset,
  FieldsetLegend,
}
