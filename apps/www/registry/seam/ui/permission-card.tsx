"use client"

import type * as React from "react"
import { Check, ShieldCheck, ShieldQuestion, X, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Button } from "./button"

// The permission prompt rendered in the thread. Pending = a raised key
// demanding attention; once decided the card settles into a quiet receipt so
// the thread keeps an audit trail instead of a dead prompt.

type PermissionDecision = "allowed" | "allowed-session" | "denied" | "auto"

const RECEIPT: Record<
  PermissionDecision,
  { icon: React.ReactNode; label: string }
> = {
  allowed: { icon: <Check className="size-3.5" />, label: "Allowed once" },
  "allowed-session": {
    icon: <ShieldCheck className="size-3.5" />,
    label: "Allowed for this session",
  },
  denied: { icon: <X className="size-3.5" />, label: "Denied" },
  auto: { icon: <Zap className="size-3.5" />, label: "Auto-approved" },
}

function PermissionCard({
  title,
  description,
  step,
  decision,
  onAllow,
  onDeny,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title: React.ReactNode
  description?: React.ReactNode
  /** Multi-question runs: renders a "2 of 3" chip. */
  step?: { current: number; total: number }
  /** Set once resolved — replaces the actions with a settled receipt. */
  decision?: PermissionDecision
  onAllow?: (scope: "once" | "session") => void
  onDeny?: () => void
}) {
  const pending = decision === undefined

  return (
    <div
      data-slot="permission-card"
      data-decision={decision}
      role="group"
      aria-label="Permission request"
      className={cn(
        "bg-card text-card-foreground w-full max-w-md space-y-3 rounded-xl squircle border border-border/60 p-4 shadow-resting",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-start gap-2.5">
          <ShieldQuestion
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
        {step ? (
          <Badge
            variant="muted"
            aria-label={`Question ${step.current} of ${step.total}`}
            className="shrink-0 tabular-nums"
          >
            {step.current} of {step.total}
          </Badge>
        ) : null}
      </div>

      {children}

      {/* Announced politely so the resolution is heard without interrupting. */}
      <div aria-live="polite">
        {pending ? (
          <div
            data-slot="permission-card-actions"
            className="flex flex-wrap items-center gap-2"
          >
            <Button size="sm" onClick={() => onAllow?.("once")}>
              Allow once
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onAllow?.("session")}
            >
              Allow for session
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => onDeny?.()}
            >
              Deny
            </Button>
          </div>
        ) : (
          <div
            data-slot="permission-card-receipt"
            className={cn(
              "bg-muted text-muted-foreground flex w-fit items-center gap-1.5 rounded-md squircle border border-border/60 px-2.5 py-1 text-xs font-medium shadow-well",
              decision === "denied" && "text-destructive"
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

// A one-line command carved into the card. For multi-line payloads compose
// code-block instead.
function PermissionCardCommand({
  className,
  ...props
}: React.ComponentProps<"code">) {
  return (
    <code
      data-slot="permission-card-command"
      className={cn(
        "bg-muted block overflow-x-auto rounded-md squircle border border-border/60 px-2.5 py-1.5 font-mono text-xs whitespace-nowrap shadow-well",
        className
      )}
      {...props}
    />
  )
}

export { PermissionCard, PermissionCardCommand, type PermissionDecision }
