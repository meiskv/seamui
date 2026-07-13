"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select"

// The composer-footer model dropdown — a recipe over Select, not a fork.
// The popup keeps select's debossed tray; the chosen model is the embossed
// key risen from it. What this adds: a footer-sized trigger, provider groups
// with connection dots, and a two-line item (name + muted description).

type ConnectionState = "connected" | "error" | "off"

// Monochrome rule: connected = filled primary, error = destructive,
// off = faint muted. Same vocabulary shape as agent-status dots.
const CONNECTION: Record<ConnectionState, string> = {
  connected: "bg-primary",
  error: "bg-destructive",
  off: "bg-muted-foreground/40",
}

const ModelPicker = Select

// Compact ghost key for a composer footer: current model + chevron, no well.
function ModelPickerTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectTrigger>) {
  return (
    <SelectTrigger
      data-slot="model-picker-trigger"
      variant="ghost"
      className={cn(
        "text-muted-foreground h-8 gap-1 px-2 text-xs font-medium",
        className
      )}
      {...props}
    >
      {children ?? <SelectValue />}
    </SelectTrigger>
  )
}

function ModelPickerContent({
  className,
  ...props
}: React.ComponentProps<typeof SelectContent>) {
  return (
    <SelectContent
      data-slot="model-picker-content"
      className={cn("min-w-56", className)}
      {...props}
    />
  )
}

// A provider group: label row carries the connection dot.
function ModelPickerProvider({
  name,
  connection = "connected",
  children,
  ...props
}: React.ComponentProps<typeof SelectGroup> & {
  name: React.ReactNode
  connection?: ConnectionState
}) {
  return (
    <SelectGroup data-slot="model-picker-provider" {...props}>
      <SelectLabel className="flex items-center gap-1.5">
        <span
          data-slot="model-picker-connection"
          data-connection={connection}
          role="img"
          aria-label={
            connection === "connected"
              ? "connected"
              : connection === "error"
                ? "connection error"
                : "not connected"
          }
          className={cn(
            "inline-block size-1.5 shrink-0 rounded-full",
            CONNECTION[connection]
          )}
        />
        {name}
      </SelectLabel>
      {children}
    </SelectGroup>
  )
}

// A model row: name, muted description line, optional meta chip ("1M ctx").
function ModelPickerItem({
  description,
  meta,
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectItem> & {
  description?: React.ReactNode
  meta?: React.ReactNode
}) {
  return (
    <SelectItem
      data-slot="model-picker-item"
      className={cn("py-2", className)}
      {...props}
    >
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="flex items-center gap-1.5">
          <span className="truncate">{children}</span>
          {meta ? (
            <span className="text-muted-foreground shrink-0 text-[10px] tabular-nums">
              {meta}
            </span>
          ) : null}
        </span>
        {description ? (
          <span className="text-muted-foreground truncate text-xs font-normal">
            {description}
          </span>
        ) : null}
      </span>
    </SelectItem>
  )
}

export {
  ModelPicker,
  ModelPickerTrigger,
  ModelPickerContent,
  ModelPickerProvider,
  ModelPickerItem,
  type ConnectionState,
}
