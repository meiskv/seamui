"use client"

import type * as React from "react"
import { Popover as BasePopover } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"
import { condense } from "@/lib/motion"

function Popover(props: React.ComponentProps<typeof BasePopover.Root>) {
  return <BasePopover.Root {...props} />
}

function PopoverTrigger(
  props: React.ComponentProps<typeof BasePopover.Trigger>
) {
  return <BasePopover.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  sideOffset = 8,
  align = "center",
  children,
  ...props
}: React.ComponentProps<typeof BasePopover.Popup> & {
  sideOffset?: number
  align?: "start" | "center" | "end"
}) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner sideOffset={sideOffset} align={align}>
        <BasePopover.Popup
          data-slot="popover-content"
          // seam condense: the surface rises out of its anchor and fades in;
          // on dismiss it falls back and fades (Base UI awaits the CSS exit).
          className={cn(
            "bg-popover text-popover-foreground z-50 w-72 rounded-lg squircle border p-4 shadow-overlay outline-none",
            condense.surface,
            className
          )}
          {...props}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

function PopoverClose(props: React.ComponentProps<typeof BasePopover.Close>) {
  return <BasePopover.Close data-slot="popover-close" {...props} />
}

function PopoverTitle({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Title>) {
  return (
    <BasePopover.Title
      data-slot="popover-title"
      className={cn("text-sm font-semibold", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Description>) {
  return (
    <BasePopover.Description
      data-slot="popover-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverTitle,
  PopoverDescription,
}
