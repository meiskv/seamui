"use client"

import type * as React from "react"
import { motion } from "motion/react"
import {
  ChevronDown,
  CircleCheck,
  CircleDashed,
  CircleMinus,
  CircleX,
  GitMerge,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced, useReducedMotion } from "@/lib/motion"
import { Button, buttonVariants } from "./button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible"
import { Spinner } from "./spinner"

// Conductor's Checks tab / Paseo's PR panel as a component: CI, deploys, and
// reviews in a flat list on a raised card; failed logs one disclosure away;
// the merge action names what it will do.

type CheckStatus = "pass" | "fail" | "running" | "pending" | "skipped"

// Monochrome rule: fail is the one hue; everything else reads by icon shape.
const STATUS: Record<
  CheckStatus,
  { icon: React.ReactNode; label: string; className?: string }
> = {
  pass: { icon: <CircleCheck className="size-4" />, label: "passed" },
  fail: {
    icon: <CircleX className="size-4" />,
    label: "failed",
    className: "text-destructive",
  },
  running: { icon: <Spinner className="size-4" />, label: "running" },
  pending: {
    icon: <CircleDashed className="size-4" />,
    label: "pending",
    className: "text-muted-foreground",
  },
  skipped: {
    icon: <CircleMinus className="size-4" />,
    label: "skipped",
    className: "text-muted-foreground",
  },
}

function ChecksPanel({
  title = "Checks",
  summary,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title?: React.ReactNode
  /** e.g. "3 passed, 1 failed" — announced with the panel. */
  summary?: string
}) {
  return (
    <div
      data-slot="checks-panel"
      role="group"
      aria-label={summary ? `Checks: ${summary}` : "Checks"}
      className={cn(
        "bg-card text-card-foreground w-full max-w-md rounded-xl squircle border border-border/60 shadow-resting",
        className
      )}
      {...props}
    >
      <div className="flex items-baseline justify-between gap-2 border-b border-border/60 px-4 py-2.5">
        <div className="text-sm font-medium">{title}</div>
        {summary ? (
          <div className="text-muted-foreground text-xs">{summary}</div>
        ) : null}
      </div>
      <div className="p-1.5">{children}</div>
    </div>
  )
}

// One check row. With children it becomes a disclosure exposing the log in a
// debossed well (the tool.tsx pattern — buttonVariants + a motion.button
// render, the composite-safe press).
function ChecksPanelItem({
  name,
  status,
  duration,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Collapsible>, "children"> & {
  name: React.ReactNode
  status: CheckStatus
  duration?: React.ReactNode
  children?: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()
  const s = STATUS[status]

  const row = (
    <>
      <span
        aria-hidden
        className={cn(
          "flex size-4 shrink-0 items-center justify-center",
          s.className
        )}
      >
        {s.icon}
      </span>
      <span className="min-w-0 flex-1 truncate text-left text-sm">
        {name}
        <span className="sr-only"> {s.label}</span>
      </span>
      {duration ? (
        <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
          {duration}
        </span>
      ) : null}
    </>
  )

  if (!children) {
    return (
      <div
        data-slot="checks-panel-item"
        data-status={status}
        className={cn("flex items-center gap-2.5 px-2.5 py-2", className)}
        {...(props as React.ComponentProps<"div">)}
      >
        {row}
      </div>
    )
  }

  return (
    <Collapsible
      data-slot="checks-panel-item"
      data-status={status}
      className={className}
      {...props}
    >
      <CollapsibleTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "group/check h-auto w-full justify-start gap-2.5 px-2.5 py-2 font-normal"
        )}
        render={
          <motion.button
            whileTap={reduceMotion ? reduced.pressed : depth.pressed}
            transition={reduceMotion ? fades.fast : springs.press}
          />
        }
      >
        {row}
        <ChevronDown
          aria-hidden
          className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-data-[panel-open]/check:rotate-180 motion-reduce:transition-none"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          data-slot="checks-panel-log"
          // Log output is read into — a carved well inside the card.
          tabIndex={0}
          className="bg-muted mx-2.5 mb-2 max-h-56 overflow-auto rounded-md squircle border border-border/60 p-2.5 shadow-well outline-none"
        >
          <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {children}
          </pre>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

const MERGE_LABEL = {
  merge: "Merge",
  squash: "Squash and merge",
  rebase: "Rebase and merge",
} as const

// The merge action that says what it will do (Paseo names the method on the
// button). A plain seamui Button — primary embossed key.
function MergeButton({
  method = "merge",
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  method?: keyof typeof MERGE_LABEL
}) {
  return (
    <Button
      data-slot="merge-button"
      size="sm"
      className={cn("gap-1.5", className)}
      {...props}
    >
      <GitMerge className="size-3.5" />
      {children ?? MERGE_LABEL[method]}
    </Button>
  )
}

// Footer strip for the merge action (and anything beside it).
function ChecksPanelFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="checks-panel-footer"
      className={cn(
        "flex items-center justify-end gap-2 border-t border-border/60 px-4 py-2.5",
        className
      )}
      {...props}
    />
  )
}

export {
  ChecksPanel,
  ChecksPanelItem,
  ChecksPanelFooter,
  MergeButton,
  type CheckStatus,
}
