"use client"

import * as React from "react"
import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced } from "@/lib/motion"

function PreviewCard(
  props: React.ComponentProps<typeof BasePreviewCard.Root>
) {
  return <BasePreviewCard.Root {...props} />
}

function PreviewCardTrigger(
  props: React.ComponentProps<typeof BasePreviewCard.Trigger>
) {
  return <BasePreviewCard.Trigger data-slot="preview-card-trigger" {...props} />
}

function PreviewCardContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Popup> & {
  sideOffset?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner sideOffset={sideOffset}>
        <BasePreviewCard.Popup
          data-slot="preview-card-content"
          className={cn(
            "bg-popover text-popover-foreground z-50 w-80 rounded-lg border p-4 shadow-overlay outline-none",
            className
          )}
          // seam motion: floating surface rises with overlay depth.
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
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  )
}

export { PreviewCard, PreviewCardTrigger, PreviewCardContent }
