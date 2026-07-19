import type * as React from "react"

import { cn } from "@/lib/utils"

// The zero-data surface: a slot waiting for content, so it reads as a
// debossed well (§1 — slots are carved in). The icon sits on a small
// embossed key rising from it. Deliberately still, like Alert — persistent
// page state gets no entrance motion.
function EmptyState({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "border-border/60 bg-muted shadow-well flex w-full flex-col items-center justify-center rounded-lg squircle border px-6 py-10 text-center",
        className
      )}
      {...props}
    />
  )
}

function EmptyStateMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-media"
      className={cn(
        "bg-secondary text-muted-foreground shadow-resting mb-3 flex size-12 items-center justify-center rounded-lg squircle [&>svg]:size-6",
        className
      )}
      {...props}
    />
  )
}

function EmptyStateTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

function EmptyStateDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-description"
      className={cn(
        "text-muted-foreground mt-1 max-w-sm text-sm leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

// Drop Buttons in here — they bring their own press depth and haptics.
function EmptyStateActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-actions"
      className={cn("mt-4 flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}

export {
  EmptyState,
  EmptyStateMedia,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
}
