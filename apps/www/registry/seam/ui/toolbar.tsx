"use client"

import type * as React from "react"
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { usePressDepth } from "@/lib/motion"
import { useHaptics } from "@/lib/haptics"
import { buttonVariants } from "./button"

// A raised strip of controls resting on the canvas. Base UI owns the roving
// focus (one tab stop, arrows move between items), which is why the items
// below attach motion via the part's render prop — wrapping them in the
// Button component would swallow the ref and kill arrow-key navigation (§5A).
function Toolbar({
  className,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Root>) {
  return (
    <BaseToolbar.Root
      data-slot="toolbar"
      className={cn(
        "bg-card border-border/60 shadow-resting flex w-fit items-center gap-1 rounded-lg squircle border p-1.5",
        "data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

type ToolbarButtonProps = React.ComponentProps<typeof BaseToolbar.Button> &
  Pick<VariantProps<typeof buttonVariants>, "variant" | "size">

function ToolbarButton({
  className,
  variant = "ghost",
  size = "sm",
  disabled,
  onPointerDown,
  ...props
}: ToolbarButtonProps) {
  const { trigger } = useHaptics()
  // The item's ref drives the toolbar's roving focus — a motion.button
  // render breaks the registration, so press depth goes on imperatively.
  const withPress = usePressDepth(disabled ?? false)
  return (
    <BaseToolbar.Button
      data-slot="toolbar-button"
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      // seam touch feedback, tactile half: a haptic tap as the pointer lands.
      onPointerDown={(e) => {
        onPointerDown?.(e)
        if (!disabled && e.button === 0) trigger("tap")
      }}
      render={(renderProps) => (
        <button
          type="button"
          {...withPress(renderProps as React.ComponentProps<"button">)}
        />
      )}
      {...props}
    />
  )
}

// Navigation inside a toolbar stays a real link (no press depth, like
// pagination) but participates in the roving focus.
function ToolbarLink({
  className,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Link>) {
  return (
    <BaseToolbar.Link
      data-slot="toolbar-link"
      className={cn(buttonVariants({ variant: "link", size: "sm" }), className)}
      {...props}
    />
  )
}

function ToolbarGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Group>) {
  return (
    <BaseToolbar.Group
      data-slot="toolbar-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

function ToolbarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Separator>) {
  return (
    <BaseToolbar.Separator
      data-slot="toolbar-separator"
      className={cn(
        "bg-border/80 mx-1 shrink-0 data-[orientation=vertical]:h-6 data-[orientation=vertical]:w-px data-[orientation=horizontal]:my-1 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-6",
        className
      )}
      {...props}
    />
  )
}

// An entry well carved into the raised strip (§1: you type into it).
function ToolbarInput({
  className,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Input>) {
  return (
    <BaseToolbar.Input
      data-slot="toolbar-input"
      className={cn(
        "border-border/60 bg-muted shadow-well h-8 w-40 min-w-0 rounded-md squircle border px-3 text-sm outline-none",
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export {
  Toolbar,
  ToolbarButton,
  ToolbarLink,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarInput,
}
