import type * as React from "react"
import { Check, CircleAlert, Eye, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "./badge"

// The canonical agent-state machine — the vocabulary session sidebars,
// headers, hover cards, and terminal blocks all share:
// waiting (on you) / working / ready (to review) / done / error.
type AgentState = "waiting" | "working" | "ready" | "done" | "error"

// The theme is monochrome, so state reads through shape + animation, not hue:
// waiting = filled + attention halo, working = filled + ambient pulse,
// ready = hollow, done = faint, error = the one sanctioned color.
// The working pulse is CSS animate-pulse — the Spinner precedent for ambient
// loops: opacity-only, so it reads identically under reduced motion, and it
// keeps running inside AnimatePresence parents where motion.dev repeat stalls.
const DOT: Record<AgentState, string> = {
  waiting: "bg-primary ring-[3px] ring-primary/20",
  working: "bg-primary animate-pulse",
  ready: "border-2 border-primary bg-transparent",
  done: "bg-muted-foreground/40",
  error: "bg-destructive",
}

const LABELS: Record<AgentState, string> = {
  waiting: "Waiting on you",
  working: "Working",
  ready: "Ready to review",
  done: "Done",
  error: "Error",
}

// Bare dot for dense rows (session lists, tab strips). With an aria-label it
// announces as a status; without one it's decoration next to visible text.
function AgentStatusDot({
  status,
  className,
  ...props
}: React.ComponentProps<"span"> & { status: AgentState }) {
  const labelled = props["aria-label"] !== undefined

  return (
    <span
      data-slot="agent-status-dot"
      data-status={status}
      role={labelled ? "status" : undefined}
      aria-hidden={labelled ? undefined : true}
      className={cn(
        "inline-block size-2 shrink-0 rounded-full",
        DOT[status],
        className
      )}
      {...props}
    />
  )
}

const CHIP: Record<
  AgentState,
  {
    variant: React.ComponentProps<typeof Badge>["variant"]
    icon: React.ReactNode
  }
> = {
  // waiting is the loudest thing in a row — an embossed primary key.
  waiting: { variant: "default", icon: <CircleAlert className="size-3" /> },
  working: {
    variant: "secondary",
    icon: <AgentStatusDot status="working" className="size-1.5" />,
  },
  ready: { variant: "secondary", icon: <Eye className="size-3" /> },
  // done settles into the surface — the debossed muted chip.
  done: { variant: "muted", icon: <Check className="size-3" /> },
  error: { variant: "destructive", icon: <X className="size-3" /> },
}

// Labeled chip on Badge — the ToolStatus pattern promoted to session level.
// Announced politely so a state change is heard without interrupting.
function AgentStatus({
  status,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Badge>, "variant"> & {
  status: AgentState
}) {
  const s = CHIP[status]
  return (
    <Badge
      data-slot="agent-status"
      data-status={status}
      variant={s.variant}
      aria-live="polite"
      className={cn("gap-1.5", className)}
      {...props}
    >
      {s.icon}
      {children ?? LABELS[status]}
    </Badge>
  )
}

export { AgentStatus, AgentStatusDot, type AgentState }
