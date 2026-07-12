import type * as React from "react"

import { cn } from "@/lib/utils"

// The bar over the thread: session identity left, telemetry and actions
// right. Canvas, not key — flat background with a hairline edge, so the
// embossed chips inside it (agent-status, branch-chip, context-meter, keys)
// carry the depth. Layout only; nothing here animates.
function WorkbenchHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="workbench-header"
      className={cn(
        "bg-background border-border/60 flex h-14 shrink-0 items-center gap-3 border-b px-4",
        className
      )}
      {...props}
    />
  )
}

function WorkbenchHeaderTitle({
  description,
  className,
  children,
  ...props
}: React.ComponentProps<"h1"> & { description?: React.ReactNode }) {
  return (
    <div data-slot="workbench-header-title" className="min-w-0">
      <h1
        className={cn(
          "truncate text-sm leading-tight font-semibold",
          className
        )}
        {...props}
      >
        {children}
      </h1>
      {description ? (
        <p className="text-muted-foreground truncate text-xs">{description}</p>
      ) : null}
    </div>
  )
}

function WorkbenchHeaderActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="workbench-header-actions"
      className={cn("ml-auto flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  )
}

export { WorkbenchHeader, WorkbenchHeaderTitle, WorkbenchHeaderActions }
