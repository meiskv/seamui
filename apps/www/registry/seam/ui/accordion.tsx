"use client"

import type * as React from "react"
import { Accordion as BaseAccordion } from "@base-ui/react/accordion"
import { motion } from "motion/react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced, useReducedMotion } from "@/lib/motion"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Root>) {
  return (
    <BaseAccordion.Root
      data-slot="accordion"
      className={cn("w-full", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Item>) {
  return (
    <BaseAccordion.Item
      data-slot="accordion-item"
      className={cn("border-b", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  disabled,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Trigger>) {
  const reduceMotion = useReducedMotion()

  return (
    <BaseAccordion.Header className="flex">
      <BaseAccordion.Trigger
        data-slot="accordion-trigger"
        disabled={disabled}
        // seam touch feedback: the row recedes on press like every other
        // button-shaped control. motion.button keeps the native element (and
        // its ref), so Base UI's keyboard handling is untouched.
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
          "group/acc flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring/50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-data-[panel-open]/acc:rotate-180 motion-reduce:transition-none" />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Panel>) {
  return (
    <BaseAccordion.Panel
      data-slot="accordion-content"
      // Base UI measures the panel height into a CSS var; we spring-ease the
      // height between 0 and that measured value. Height is the one thing we
      // ease with a duration (like opacity), not a transform spring.
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden text-sm transition-[height] duration-200 ease-out motion-reduce:transition-none",
        "data-[starting-style]:h-0 data-[ending-style]:h-0",
        className
      )}
      {...props}
    >
      <div className="pb-4">{children}</div>
    </BaseAccordion.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
