"use client"

import type * as React from "react"
import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card"

import { cn } from "@/lib/utils"
import { condense } from "@/lib/motion"

function PreviewCard(props: React.ComponentProps<typeof BasePreviewCard.Root>) {
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
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner sideOffset={sideOffset}>
        <BasePreviewCard.Popup
          data-slot="preview-card-content"
          className={cn(
            "bg-popover text-popover-foreground z-50 w-80 rounded-lg border p-4 shadow-overlay outline-none",
            // seam motion: floating surface rises with overlay depth, falls back on close.
            condense.surface,
            className
          )}
          {...props}
        >
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  )
}

export { PreviewCard, PreviewCardTrigger, PreviewCardContent }
