"use client"

import type * as React from "react"
import { Check, Flag, ListTodo, RotateCcw, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

// Plan mode's moment of trust: the agent proposes, you inspect and approve.
// The proposal is a raised key; steps sit flat inside it; once decided the
// card settles into a receipt. The same card renders live execution progress
// by flipping `done` on steps.

type PlanDecision = "approved" | "rejected"

const RECEIPT: Record<PlanDecision, { icon: React.ReactNode; label: string }> =
  {
    approved: { icon: <Check className="size-3.5" />, label: "Plan approved" },
    rejected: { icon: <X className="size-3.5" />, label: "Plan rejected" },
  }

function PlanCard({
  title = "Proposed plan",
  description,
  decision,
  onApprove,
  onReject,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  /** Set once resolved — replaces the actions with a settled receipt. */
  decision?: PlanDecision
  onApprove?: () => void
  onReject?: () => void
}) {
  const pending = decision === undefined

  return (
    <div
      data-slot="plan-card"
      data-decision={decision}
      role="group"
      aria-label="Proposed plan"
      className={cn(
        "bg-card text-card-foreground w-full max-w-md space-y-3 rounded-xl squircle border border-border/60 p-4 shadow-resting",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 items-start gap-2.5">
        <ListTodo
          aria-hidden
          className="text-muted-foreground mt-0.5 size-4 shrink-0"
        />
        <div className="min-w-0">
          <div className="text-sm font-medium">{title}</div>
          {description ? (
            <div className="text-muted-foreground text-xs">{description}</div>
          ) : null}
        </div>
      </div>

      <ol data-slot="plan-card-steps" className="space-y-1.5">
        {children}
      </ol>

      <div aria-live="polite">
        {pending ? (
          <div
            data-slot="plan-card-actions"
            className="flex flex-wrap items-center gap-2"
          >
            <Button size="sm" onClick={() => onApprove?.()}>
              Approve plan
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onReject?.()}>
              Reject
            </Button>
          </div>
        ) : (
          <div
            data-slot="plan-card-receipt"
            className={cn(
              "bg-muted text-muted-foreground flex w-fit items-center gap-1.5 rounded-md squircle border border-border/60 px-2.5 py-1 text-xs font-medium shadow-well",
              decision === "rejected" && "text-destructive"
            )}
          >
            {RECEIPT[decision].icon}
            {RECEIPT[decision].label}
          </div>
        )}
      </div>
    </div>
  )
}

// One checklist row. `index` renders as a quiet tabular number until `done`
// swaps it for a check and the row settles muted.
function PlanCardStep({
  index,
  done = false,
  className,
  children,
  ...props
}: React.ComponentProps<"li"> & {
  index?: number
  done?: boolean
}) {
  return (
    <li
      data-slot="plan-card-step"
      data-done={done || undefined}
      className={cn(
        "flex items-baseline gap-2.5 text-sm",
        done && "text-muted-foreground",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="text-muted-foreground flex w-4 shrink-0 justify-center text-xs tabular-nums"
      >
        {done ? <Check className="size-3.5 self-center" /> : (index ?? "•")}
      </span>
      <span className="min-w-0">
        {children}
        {done ? <span className="sr-only"> (completed)</span> : null}
      </span>
    </li>
  )
}

// The timeline strip: settled history with a Restore key — not a demand, so
// it's debossed muted rather than raised.
function PlanCardCheckpoint({
  label = "Checkpoint saved",
  onRestore,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  label?: React.ReactNode
  onRestore?: () => void
}) {
  return (
    <div
      data-slot="plan-card-checkpoint"
      className={cn(
        "bg-muted text-muted-foreground flex w-full max-w-md items-center gap-2 rounded-md squircle border border-border/60 px-2.5 py-1.5 text-xs shadow-well",
        className
      )}
      {...props}
    >
      <Flag aria-hidden className="size-3.5 shrink-0" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 gap-1 px-2 text-xs"
        onClick={() => onRestore?.()}
      >
        <RotateCcw className="size-3" /> Restore
      </Button>
    </div>
  )
}

export { PlanCard, PlanCardStep, PlanCardCheckpoint, type PlanDecision }
