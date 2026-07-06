"use client"

import * as React from "react"
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced } from "@/lib/motion"

function TooltipProvider({
  delay = 200,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Provider>) {
  return <BaseTooltip.Provider delay={delay} {...props} />
}

function Tooltip(props: React.ComponentProps<typeof BaseTooltip.Root>) {
  return <BaseTooltip.Root {...props} />
}

function TooltipTrigger(
  props: React.ComponentProps<typeof BaseTooltip.Trigger>
) {
  return <BaseTooltip.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Popup> & { sideOffset?: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner sideOffset={sideOffset}>
        <BaseTooltip.Popup
          data-slot="tooltip-content"
          className={cn(
            // raised white key floating above the surface (seam design language).
            "bg-popover text-popover-foreground z-50 w-fit rounded-lg squircle px-3 py-1.5 text-xs font-medium shadow-overlay",
            className
          )}
          // seam motion: the surface rises toward the user on open.
          render={
            <motion.div
              initial={reduceMotion ? reduced.fadeIn.initial : depth.overlay.initial}
              animate={depth.overlay.animate}
              transition={reduceMotion ? fades.normal : springs.surface}
            />
          }
          {...props}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
