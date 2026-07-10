import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Separator } from "./separator"

// A conversation with temporal structure. Grouping is presentational: the
// consumer passes ordered messages and decides the day boundaries and which
// consecutive-sender runs collapse their avatar. Place a ChatTimeline inside a
// Conversation so the sticky date headers pin as history scrolls.
function ChatTimeline({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-timeline"
      role="list"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function ChatTimelineGroup({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="chat-timeline-group"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

// Sticky centered date chip — a debossed muted Badge, temporal metadata carved
// in rather than competing with the message keys. A constant subtle backdrop
// keeps it legible over content scrolling beneath; nothing translates, so it
// reads the same under reduced motion.
function ChatTimelineHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-timeline-header"
      className={cn("sticky top-0 z-10 flex justify-center py-1.5", className)}
      {...props}
    >
      <Badge
        variant="muted"
        className="bg-muted/85 shadow-none backdrop-blur-sm"
      >
        {children}
      </Badge>
    </div>
  )
}

// The new-messages rule: a hairline separator with a muted label. Announced
// once via the wrapper's role/label; the flanking rules are decorative.
function ChatTimelineDivider({
  className,
  children = "New",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-timeline-divider"
      role="separator"
      aria-label={typeof children === "string" ? children : "New messages"}
      className={cn("flex items-center gap-2 py-1", className)}
      {...props}
    >
      <Separator aria-hidden className="flex-1" />
      <Badge variant="muted" className="shadow-none text-[0.625rem]">
        {children}
      </Badge>
      <Separator aria-hidden className="flex-1" />
    </div>
  )
}

export {
  ChatTimeline,
  ChatTimelineGroup,
  ChatTimelineHeader,
  ChatTimelineDivider,
}
