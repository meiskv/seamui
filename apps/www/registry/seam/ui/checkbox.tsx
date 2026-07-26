"use client"

import type * as React from "react"
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import { motion } from "motion/react"
import { Check, Minus } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  springs,
  fades,
  depth,
  reduced,
  useMounted,
  useReducedMotion,
} from "@/lib/motion"
import { useHaptics } from "@/lib/haptics"

function Checkbox({
  className,
  disabled,
  onCheckedChange,
  ...props
}: React.ComponentProps<typeof BaseCheckbox.Root>) {
  const reduceMotion = useReducedMotion()
  const { trigger } = useHaptics()
  // Defer the mark's entrance until after hydration: `initial` serializes
  // `opacity:0;transform:scale(0)` on the server for a defaultChecked box,
  // which the client's first paint doesn't match. `initial={false}` renders
  // the settled mark during SSR/hydration; a genuine user-check (mounted, the
  // indicator remounts) still pops in.
  const mounted = useMounted()

  return (
    <BaseCheckbox.Root
      data-slot="checkbox"
      disabled={disabled}
      // the render element below IS a native <button> — tell Base UI, since a
      // custom render flips its default to "assume non-button".
      nativeButton
      // tactile feedback: a tick as the state commits (no-op sans provider).
      onCheckedChange={(
        ...args: Parameters<NonNullable<typeof onCheckedChange>>
      ) => {
        trigger("tick")
        onCheckedChange?.(...args)
      }}
      // seam touch feedback: the box itself recedes on press (the mark's pop
      // is state motion, not press motion — a control needs both).
      render={
        <motion.button
          whileTap={
            disabled
              ? undefined
              : reduceMotion
                ? reduced.pressed
                : depth.pressed
          }
          transition={reduceMotion ? fades.fast : springs.press}
        />
      }
      className={cn(
        // debossed well unchecked → embossed primary key when checked.
        "group/cb peer flex size-4.5 shrink-0 items-center justify-center rounded-[5px] squircle border border-border/60 bg-muted shadow-well outline-none",
        "data-[checked]:bg-primary data-[checked]:border-primary data-[checked]:text-primary-foreground data-[checked]:shadow-resting",
        "data-[indeterminate]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:text-primary-foreground data-[indeterminate]:shadow-resting",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <BaseCheckbox.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
        render={
          // seam motion: the mark pops in with a snappy spring.
          <motion.span
            initial={
              !mounted
                ? false
                : reduceMotion
                  ? reduced.fadeIn.initial
                  : { scale: 0, opacity: 0 }
            }
            animate={{ scale: 1, opacity: 1 }}
            transition={reduceMotion ? fades.fast : springs.snappy}
          />
        }
      >
        <Check
          className="size-3.5 group-data-[indeterminate]/cb:hidden"
          strokeWidth={3}
        />
        <Minus
          className="hidden size-3.5 group-data-[indeterminate]/cb:block"
          strokeWidth={3}
        />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  )
}

export { Checkbox }
