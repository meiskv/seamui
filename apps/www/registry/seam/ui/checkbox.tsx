"use client"

import * as React from "react"
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import { motion, useReducedMotion } from "motion/react"
import { Check, Minus } from "lucide-react"

import { cn } from "@/lib/utils"
import { springs } from "@/lib/motion"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckbox.Root>) {
  const reduceMotion = useReducedMotion()

  return (
    <BaseCheckbox.Root
      data-slot="checkbox"
      className={cn(
        "group/cb peer size-4.5 shrink-0 rounded-[4px] border border-input shadow-pressed outline-none",
        "data-[checked]:bg-primary data-[checked]:border-primary data-[checked]:text-primary-foreground",
        "data-[indeterminate]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:text-primary-foreground",
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
            initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={springs.snappy}
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
