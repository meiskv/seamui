"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Button, type ButtonProps } from "./button"
import { AgentStatus, AgentStatusDot, type AgentState } from "./agent-status"
import { BranchChip } from "./branch-chip"

// Inside a collapsed sidebar rail the text/badge halves fade out on the same
// clock as the width; outside a sidebar the group selector never matches and
// these classes are inert, so SessionItem stays sidebar-optional.
const railFade =
  "transition-opacity duration-300 motion-reduce:transition-none group-data-[state=collapsed]/sidebar:opacity-0"

// The rich sidebar row: status dot + title + time + unread count. It wears
// Button (ghost, row-shaped) so press depth, the haptic tap, and focus come
// from the foundation. At rest it sits flat in the sidebar well; the active
// row rises as an embossed key (data-active → secondary + shadow-resting).
// No nested interactive elements — branch copy lives on SessionCard.
function SessionItem({
  title,
  status,
  time,
  unread = 0,
  active,
  className,
  ...props
}: Omit<ButtonProps, "children"> & {
  title: React.ReactNode
  status: AgentState
  time?: React.ReactNode
  unread?: number
  active?: boolean
}) {
  return (
    <Button
      data-slot="session-item"
      variant="ghost"
      data-active={active || undefined}
      aria-current={active ? "true" : undefined}
      className={cn(
        "h-auto w-full justify-start gap-2.5 px-2.5 py-2 font-normal",
        "data-[active]:bg-secondary data-[active]:hover:bg-secondary data-[active]:shadow-resting",
        className
      )}
      {...props}
    >
      <AgentStatusDot status={status} />
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-left text-sm",
          unread > 0 && "font-medium",
          railFade
        )}
      >
        {title}
      </span>
      {time ? (
        <span
          className={cn("text-muted-foreground text-xs tabular-nums", railFade)}
        >
          {time}
        </span>
      ) : null}
      {unread > 0 ? (
        <Badge
          aria-label={`${unread} unread`}
          className={cn("h-4 min-w-4 px-1 text-[10px] tabular-nums", railFade)}
        >
          {unread}
        </Badge>
      ) : null}
    </Button>
  )
}

// The hover-card content: live status, branch, meta rows, quick next-actions.
// Layout only — sit it inside PreviewCardContent for the hover wiring (see the
// hover-card example), or inside a popover where hover doesn't exist (touch).
function SessionCard({
  title,
  status,
  branch,
  actions,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title: React.ReactNode
  status: AgentState
  branch?: string
  actions?: React.ReactNode
}) {
  return (
    <div
      data-slot="session-card"
      className={cn("space-y-3", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 truncate text-sm font-medium">{title}</div>
        <AgentStatus status={status} className="shrink-0" />
      </div>
      {branch ? <BranchChip branch={branch} /> : null}
      {children ? <div className="space-y-1.5">{children}</div> : null}
      {actions ? (
        <div data-slot="session-card-actions" className="flex gap-2 pt-1">
          {actions}
        </div>
      ) : null}
    </div>
  )
}

// One label/value meta line on the card ("Model — Fable 5").
function SessionCardRow({
  label,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { label: React.ReactNode }) {
  return (
    <div
      data-slot="session-card-row"
      className={cn(
        "flex items-baseline justify-between gap-3 text-xs",
        className
      )}
      {...props}
    >
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="min-w-0 truncate text-right">{children}</span>
    </div>
  )
}

export { SessionItem, SessionCard, SessionCardRow }
