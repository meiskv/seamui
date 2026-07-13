"use client"

import * as React from "react"
import { PanelLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Button } from "./button"

type SidebarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used within <SidebarProvider>")
  return ctx
}

// Owns the expanded/collapsed state and the ⌘/Ctrl+B shortcut. The wrapper
// carries data-state so the panel (and anything else) can style off it.
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [openState, setOpenState] = React.useState(defaultOpen)
  const open = openProp ?? openState

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOpenState(next)
      onOpenChange?.(next)
    },
    [openProp, onOpenChange]
  )

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "b" &&
        (e.metaKey || e.ctrlKey) &&
        !e.shiftKey &&
        !e.altKey
      ) {
        e.preventDefault()
        setOpen(!open)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, setOpen])

  const value = React.useMemo(
    () => ({ open, setOpen, toggle: () => setOpen(!open) }),
    [open, setOpen]
  )

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-provider"
        data-state={open ? "expanded" : "collapsed"}
        className={cn("group/sidebar flex min-h-0 w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

// The panel — the well at app scale: a recessed muted surface the active row
// rises out of as an embossed key. Collapse is a width transition to a slim
// icon rail (a layout dimension that can't spring cleanly → eased CSS,
// suppressed under reduced motion); labels fade on the same clock.
function Sidebar({ className, ...props }: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="sidebar"
      className={cn(
        "flex h-full min-h-0 w-64 shrink-0 flex-col overflow-hidden",
        "border-border/60 bg-muted/40 border-r",
        "transition-[width] duration-300 ease-out motion-reduce:transition-none",
        "group-data-[state=collapsed]/sidebar:w-12",
        className
      )}
      {...props}
    />
  )
}

// The label half of a row/group: clipped by the rail, faded on the same clock
// as the width so collapse never wraps or reflows text.
function SidebarLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="sidebar-label"
      className={cn(
        "min-w-0 truncate transition-opacity duration-300 motion-reduce:transition-none",
        "group-data-[state=collapsed]/sidebar:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex shrink-0 items-center gap-2 p-3", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn("min-h-0 flex-1 overflow-y-auto p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        "border-border/60 flex shrink-0 items-center gap-2 border-t p-3",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("flex flex-col gap-0.5 py-2", className)}
      {...props}
    />
  )
}

// Group heading with an optional count — the status-grouped sidebar pattern
// ("Waiting on you · 2"). The count stays quiet: a debossed muted chip.
function SidebarGroupLabel({
  count,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { count?: number }) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "text-muted-foreground flex h-6 items-center justify-between gap-2 px-2.5 text-xs font-medium",
        className
      )}
      {...props}
    >
      <SidebarLabel>{children}</SidebarLabel>
      {count !== undefined && count > 0 ? (
        <Badge
          variant="muted"
          aria-label={`${count} sessions`}
          className="h-4 min-w-4 px-1 text-[10px] tabular-nums transition-opacity duration-300 motion-reduce:transition-none group-data-[state=collapsed]/sidebar:opacity-0"
        >
          {count}
        </Badge>
      ) : null}
    </div>
  )
}

// Collapse toggle — a plain seamui Button, usable anywhere inside the provider
// (sidebar header, workbench header). ⌘/Ctrl+B does the same from anywhere.
function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { open, toggle } = useSidebar()
  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
      aria-expanded={open}
      className={cn("size-8", className)}
      onClick={(e) => {
        onClick?.(e)
        toggle()
      }}
      {...props}
    >
      <PanelLeft className="size-4" />
    </Button>
  )
}

export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarLabel,
  SidebarTrigger,
  useSidebar,
}
