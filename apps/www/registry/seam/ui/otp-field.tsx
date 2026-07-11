"use client"

import * as React from "react"
import { OTPField as BaseOTPField } from "@base-ui/react/otp-field"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs, fades, shake, reduced } from "@/lib/motion"
import { useHaptics } from "@/lib/haptics"

const MotionInput = motion.create(BaseOTPField.Input)

// Entry wells don't press (§1 — slots, not keys), but they do react: each
// slot pops as its digit lands (opacity-only under reduced motion), and the
// whole group shakes when `invalid` flips on (reduced: an opacity flash —
// the destructive border below carries the state either way). The caret is
// the browser's own — every slot is a real <input>, so nothing fake to blink.
function OTPField({
  className,
  length = 6,
  invalid,
  value,
  defaultValue,
  onValueChange,
  ...props
}: React.ComponentProps<typeof BaseOTPField.Root> & { invalid?: boolean }) {
  const reduceMotion = useReducedMotion() ?? false
  const { trigger } = useHaptics()
  const [internalLen, setInternalLen] = React.useState(() =>
    typeof defaultValue === "string" ? defaultValue.length : 0
  )
  const filled = typeof value === "string" ? value.length : internalLen
  const filledRef = React.useRef(filled)
  filledRef.current = filled

  // tactile feedback: the error pattern when a code is rejected.
  React.useEffect(() => {
    if (invalid) trigger("error")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invalid])

  return (
    <BaseOTPField.Root
      data-slot="otp-field"
      data-invalid={invalid || undefined}
      length={length}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(
        ...args: Parameters<NonNullable<typeof onValueChange>>
      ) => {
        // tactile feedback: a tick per digit landed (not on delete).
        if (args[0].length > filledRef.current) trigger("tick")
        setInternalLen(args[0].length)
        onValueChange?.(...args)
      }}
      render={
        <motion.div
          animate={
            invalid
              ? reduceMotion
                ? reduced.flash.animate
                : shake.animate
              : undefined
          }
          transition={
            reduceMotion ? reduced.flash.transition : shake.transition
          }
        />
      }
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {/* Render one Input per slot; each derives its index from DOM order. */}
      {Array.from({ length }).map((_, i) => (
        <MotionInput
          key={i}
          data-slot="otp-field-input"
          aria-invalid={invalid || undefined}
          initial={false}
          animate={i < filled ? "filled" : "empty"}
          variants={
            reduceMotion
              ? { filled: { opacity: [0.5, 1] }, empty: { opacity: 1 } }
              : { filled: { scale: [1.12, 1] }, empty: { scale: 1 } }
          }
          transition={reduceMotion ? fades.fast : springs.snappy}
          className={cn(
            "size-10 rounded-md squircle border border-border/60 bg-muted text-center text-sm shadow-well outline-none",
            "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
            "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            invalid &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30"
          )}
        />
      ))}
    </BaseOTPField.Root>
  )
}

export { OTPField }
