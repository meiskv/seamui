"use client"

import * as React from "react"
import { Field as BaseField } from "@base-ui/react/field"
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { fades, reduced, shake } from "@/lib/motion"
import { useHaptics } from "@/lib/haptics"

function Field({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Root>) {
  return (
    <BaseField.Root
      data-slot="field"
      className={cn("flex w-full flex-col gap-2", className)}
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
        "text-sm leading-none font-medium select-none",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

// The styled control is seamui's Input — Base UI's Input part is Field-aware
// on its own, so `<Field><Input /></Field>` wires up automatically. This thin
// unstyled wrapper exists for the `render` composition: wiring a control that
// isn't an input into the field, e.g. <FieldControl render={<Textarea />} />.
function FieldControl({
  ...props
}: React.ComponentProps<typeof BaseField.Control>) {
  return <BaseField.Control data-slot="field-control" {...props} />
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

// Base UI mounts the error element only while the field is invalid, so this
// surface's mount IS the "error appeared" signal: it shakes in (opacity-only
// entrance under reduced motion — the destructive text carries the state
// either way) and fires the error haptic, matching the OTP field's
// rejected-code pattern.
function FieldErrorSurface({
  ...props
}: React.ComponentProps<typeof motion.div>) {
  const reduceMotion = useReducedMotion() ?? false
  const { trigger } = useHaptics()

  React.useEffect(() => {
    trigger("error")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      initial={reduced.fadeIn.initial}
      animate={
        reduceMotion
          ? reduced.fadeIn.animate
          : { opacity: 1, x: shake.animate.x }
      }
      transition={reduceMotion ? fades.normal : shake.transition}
      {...props}
    />
  )
}

function FieldError({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Error>) {
  return (
    <BaseField.Error
      data-slot="field-error"
      className={cn("text-destructive text-sm", className)}
      render={<FieldErrorSurface />}
      {...props}
    />
  )
}

// Render-prop access to the control's ValidityState — no DOM of its own.
const FieldValidity = BaseField.Validity

function FieldItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Item>) {
  return (
    <BaseField.Item
      data-slot="field-item"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

function Fieldset({
  className,
  ...props
}: React.ComponentProps<typeof BaseFieldset.Root>) {
  return (
    <BaseFieldset.Root
      data-slot="fieldset"
      className={cn("flex w-full flex-col gap-4", className)}
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
      className={cn("text-sm leading-none font-semibold", className)}
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
  FieldValidity,
  FieldItem,
  Fieldset,
  FieldsetLegend,
}
