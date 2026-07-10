"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { Brain, Check, ChevronDown, Wrench, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced } from "@/lib/motion"
import { Badge } from "./badge"
import { buttonVariants } from "./button"
import { Spinner } from "./spinner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible"

type ToolState = "pending" | "running" | "done" | "error"

// A step row is telemetry, not a key — a quiet debossed strip carved into the
// surface (bg-muted + shadow-well). The result sits in the well when expanded.
function Tool({ className, ...props }: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      data-slot="tool"
      className={cn(
        "bg-muted/60 rounded-lg squircle border border-border/60 shadow-well",
        className
      )}
      {...props}
    />
  )
}

const STATUS: Record<
  ToolState,
  {
    variant: React.ComponentProps<typeof Badge>["variant"]
    label: string
    icon: React.ReactNode
  }
> = {
  pending: { variant: "muted", label: "Pending", icon: <Spinner className="size-3" /> },
  running: { variant: "secondary", label: "Running", icon: <Spinner className="size-3" /> },
  done: { variant: "secondary", label: "Done", icon: <Check className="size-3" /> },
  error: { variant: "destructive", label: "Error", icon: <X className="size-3" /> },
}

// State chip. Pending/running spin; done/error resolve to an icon. Announced
// politely so a status change is heard without interrupting.
function ToolStatus({
  status,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Badge>, "variant"> & {
  status: ToolState
}) {
  const s = STATUS[status]
  return (
    <Badge
      data-slot="tool-status"
      variant={s.variant}
      aria-live="polite"
      className={cn("gap-1", className)}
      {...props}
    >
      {s.icon}
      {children ?? s.label}
    </Badge>
  )
}

// The disclosure trigger. Collapsible has a single trigger (no roving focus),
// but we still dogfood buttonVariants + a motion.button render for press
// feedback rather than re-rolling the button base — the composite-safe path.
function ToolHeader({
  className,
  title,
  status,
  icon,
  ...props
}: Omit<React.ComponentProps<typeof CollapsibleTrigger>, "title"> & {
  title: React.ReactNode
  status?: ToolState
  icon?: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()
  return (
    <CollapsibleTrigger
      data-slot="tool-header"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "group/tool h-auto w-full justify-between gap-2 px-3 py-2 font-normal",
        className
      )}
      render={
        <motion.button
          whileTap={reduceMotion ? reduced.pressed : depth.pressed}
          transition={reduceMotion ? fades.fast : springs.press}
        />
      }
      {...props}
    >
      <span className="flex min-w-0 items-center gap-2 text-sm">
        <span className="text-muted-foreground flex size-4 shrink-0 items-center justify-center [&_svg]:size-4">
          {icon ?? <Wrench />}
        </span>
        <span className="truncate">{title}</span>
      </span>
      <span className="flex shrink-0 items-center gap-2">
        {status ? <ToolStatus status={status} /> : null}
        <ChevronDown className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-data-[panel-open]/tool:rotate-180 motion-reduce:transition-none" />
      </span>
    </CollapsibleTrigger>
  )
}

function ToolContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent data-slot="tool-content" className={className} {...props}>
      <div className="space-y-2 px-3 pb-3 pt-0.5 text-sm">{children}</div>
    </CollapsibleContent>
  )
}

// Reasoning is the same disclosure shape for chain-of-thought — a Brain by
// default and muted prose inside.
function Reasoning({
  className,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  return (
    <Tool data-slot="reasoning" className={className} {...props} />
  )
}

function ReasoningTrigger({
  title = "Reasoning",
  icon,
  ...props
}: Omit<React.ComponentProps<typeof ToolHeader>, "title"> & {
  title?: React.ReactNode
}) {
  return <ToolHeader title={title} icon={icon ?? <Brain />} {...props} />
}

const ReasoningContent = ToolContent

export {
  Tool,
  ToolHeader,
  ToolStatus,
  ToolContent,
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
}
