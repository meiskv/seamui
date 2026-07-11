"use client"

import type * as React from "react"
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Root>) {
  return (
    <BaseScrollArea.Root
      data-slot="scroll-area"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <BaseScrollArea.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] outline-none"
      >
        <BaseScrollArea.Content>{children}</BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      <ScrollBar />
      <BaseScrollArea.Corner />
    </BaseScrollArea.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Scrollbar>) {
  return (
    <BaseScrollArea.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none select-none p-0.5 opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[scrolling]:opacity-100 data-[scrolling]:delay-0",
        orientation === "vertical" && "h-full w-2",
        orientation === "horizontal" && "h-2 w-full flex-col",
        className
      )}
      {...props}
    >
      <BaseScrollArea.Thumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </BaseScrollArea.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
