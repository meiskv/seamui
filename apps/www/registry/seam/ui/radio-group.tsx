"use client"

import type * as React from "react"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import { Radio as BaseRadio } from "@base-ui/react/radio"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced } from "@/lib/motion"
import { useHaptics } from "@/lib/haptics"

function RadioGroup({
  className,
  onValueChange,
  ...props
}: React.ComponentProps<typeof BaseRadioGroup>) {
  const { trigger } = useHaptics()
  return (
    <BaseRadioGroup
      data-slot="radio-group"
      className={cn("grid gap-2.5", className)}
      // tactile feedback: a tick as the selection commits (no-op sans provider).
      onValueChange={(
        ...args: Parameters<NonNullable<typeof onValueChange>>
      ) => {
        trigger("tick")
        onValueChange?.(...args)
      }}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof BaseRadio.Root>) {
  const reduceMotion = useReducedMotion()

  return (
    <BaseRadio.Root
      data-slot="radio-group-item"
      disabled={disabled}
      className={cn(
        "group/radio flex aspect-square size-4.5 shrink-0 items-center justify-center rounded-full outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* seam touch feedback: the ring recedes on press. RadioGroup is a Base
          UI composite — replacing the item element breaks roving arrow-key
          focus — so the visual ring is a child and the composite element stays
          untouched. */}
      <motion.span
        whileTap={
          disabled ? undefined : reduceMotion ? reduced.pressed : depth.pressed
        }
        transition={reduceMotion ? fades.fast : springs.press}
        className={cn(
          // debossed ring — the well is carved in; the checked dot rides in it.
          "flex size-full items-center justify-center rounded-full border border-border/60 bg-muted shadow-well",
          "group-data-[checked]/radio:border-primary"
        )}
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
      </motion.span>
    </BaseRadio.Root>
  )
}

export { RadioGroup, RadioGroupItem }
