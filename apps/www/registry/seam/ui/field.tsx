"use client"

import * as React from "react"
import { Field as BaseField } from "@base-ui/react/field"
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { reduced, shake, useMounted } from "@/lib/motion"
import { useHaptics } from "@/lib/haptics"
import { Input } from "./input"

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

// Renders the seam Input by default (dogfooding: debossed well, focus ring,
// invalid styling for free); pass `render` to wire any other control into the
// field, e.g. <FieldControl render={<Textarea />} />. Dropping a seam
// Input/Textarea directly inside <Field> works too — they're Field-aware.
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

// motion.create() per element type, cached so re-renders reuse components
// (same shape as button.tsx's consumer-render wrapping).
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

function hasRenderableContent(children: React.ReactNode): boolean {
  if (children == null || typeof children === "boolean") return false
  if (typeof children === "string") return children.length > 0
  if (Array.isArray(children)) return children.some(hasRenderableContent)
  return true
}

// One error signal per rejection: surfaces mounting in the same validation
// pass (multi-field submit) coalesce into a single haptic — overlapping
// navigator.vibrate() calls would cancel each other into a garbled buzz.
let lastErrorHapticAt = 0

type FieldErrorSurfaceProps = React.ComponentProps<typeof motion.div> & {
  /** False while the page is first painting — a pre-existing error (server
   *  errors, forced `invalid`, `match`) renders statically instead of
   *  buzzing/shaking a page the user hasn't touched. */
  fresh?: boolean
  /** Consumer-supplied render element to wrap with the error motion. */
  consumerEl?: React.ReactElement | null
}

// The seam error pattern (CLAUDE.md §3: shake, paired with reduced.flash
// under reduced motion, plus the error haptic) — fired when an error message
// APPEARS: on a post-first-paint mount, or when a message lands in an
// already-mounted error (Form `errors`, `match`). A message merely changing
// text doesn't re-fire, matching the OTP field's flip-on-invalid wiring.
const FieldErrorSurface = React.forwardRef<HTMLElement, FieldErrorSurfaceProps>(
  function FieldErrorSurface({ fresh = true, consumerEl, ...props }, ref) {
    const reduceMotion = useReducedMotion() ?? false
    const { trigger } = useHaptics()

    const hasMessage = hasRenderableContent(props.children as React.ReactNode)
    const [signal, setSignal] = React.useState(() =>
      fresh && hasMessage ? 1 : 0
    )
    const prevHasMessage = React.useRef(hasMessage)
    React.useEffect(() => {
      if (hasMessage && !prevHasMessage.current) setSignal((n) => n + 1)
      prevHasMessage.current = hasMessage
    }, [hasMessage])

    const firedFor = React.useRef(0)
    React.useEffect(() => {
      if (signal === 0 || firedFor.current === signal) return
      firedFor.current = signal
      const now = performance.now()
      if (now - lastErrorHapticAt > 64) {
        lastErrorHapticAt = now
        trigger("error")
      }
    }, [signal, trigger])

    const Comp = consumerEl
      ? asMotion(consumerEl.type as React.ElementType)
      : motion.div
    const elProps = (consumerEl?.props ?? {}) as { className?: string }
    const merged = {
      ...elProps,
      ...props,
      className: cn(elProps.className, props.className),
      ref,
    }

    if (signal === 0) return <Comp {...merged} />
    return (
      // key: a fresh signal remounts the surface so the keyframes re-run
      // when a new error lands in an already-mounted slot.
      <Comp
        key={signal}
        animate={reduceMotion ? reduced.flash.animate : shake.animate}
        transition={reduceMotion ? reduced.flash.transition : shake.transition}
        {...merged}
      />
    )
  }
)

function FieldError({
  className,
  render,
  ...props
}: React.ComponentProps<typeof BaseField.Error>) {
  // True only after first paint: errors present at initial render (restored
  // server errors, forced invalid) appear statically; errors that happen
  // later get the full shake + haptic signal.
  const mounted = useMounted()
  return (
    <BaseField.Error
      data-slot="field-error"
      className={cn("text-destructive text-sm", className)}
      render={
        // Function-form render passes through untouched (no error motion),
        // matching button.tsx; element-form is motion-wrapped so a custom
        // element keeps the seam error feedback.
        typeof render === "function" ? (
          render
        ) : (
          <FieldErrorSurface fresh={mounted} consumerEl={render} />
        )
      }
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
