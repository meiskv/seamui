"use client"

import * as React from "react"
import { Menu as BaseMenu } from "@base-ui/react/menu"
import { motion, useReducedMotion } from "motion/react"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced } from "@/lib/motion"

// Shared item shape so Item / CheckboxItem / RadioItem / SubTrigger stay in sync.
const menuItemClass =
  "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0"

function DropdownMenu(props: React.ComponentProps<typeof BaseMenu.Root>) {
  return <BaseMenu.Root {...props} />
}

function DropdownMenuTrigger(
  props: React.ComponentProps<typeof BaseMenu.Trigger>
) {
  return <BaseMenu.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  className,
  sideOffset = 6,
  align = "start",
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.Popup> & {
  sideOffset?: number
  align?: "start" | "center" | "end"
}) {
  const reduceMotion = useReducedMotion()

  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={sideOffset} align={align}>
        <BaseMenu.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "bg-popover text-popover-foreground z-50 min-w-40 rounded-lg border p-1 shadow-overlay outline-none",
            className
          )}
          render={
            <motion.div
              initial={reduceMotion ? reduced.fadeIn.initial : depth.overlay.initial}
              animate={depth.overlay.animate}
              transition={reduceMotion ? fades.normal : springs.surface}
            />
          }
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

function DropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Item>) {
  return (
    <BaseMenu.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuGroup(props: React.ComponentProps<typeof BaseMenu.Group>) {
  return <BaseMenu.Group data-slot="dropdown-menu-group" {...props} />
}

// A plain styled label so it works standalone in the menu (matching the
// shadcn API). Base UI's Menu.GroupLabel requires a wrapping Menu.Group and
// throws otherwise; use DropdownMenuGroup when you want a labelled group.
function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-label"
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Separator>) {
  return (
    <BaseMenu.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.CheckboxItem>) {
  return (
    <BaseMenu.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(menuItemClass, "pl-8", className)}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <BaseMenu.CheckboxItemIndicator>
          <Check className="size-4" strokeWidth={3} />
        </BaseMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseMenu.CheckboxItem>
  )
}

function DropdownMenuRadioGroup(
  props: React.ComponentProps<typeof BaseMenu.RadioGroup>
) {
  return <BaseMenu.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioItem>) {
  return (
    <BaseMenu.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(menuItemClass, "pl-8", className)}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <BaseMenu.RadioItemIndicator>
          <Circle className="size-2 fill-current" />
        </BaseMenu.RadioItemIndicator>
      </span>
      {children}
    </BaseMenu.RadioItem>
  )
}

function DropdownMenuSub(
  props: React.ComponentProps<typeof BaseMenu.SubmenuRoot>
) {
  return <BaseMenu.SubmenuRoot {...props} />
}

function DropdownMenuSubTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuTrigger>) {
  return (
    <BaseMenu.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      className={cn(menuItemClass, "data-[popup-open]:bg-accent", className)}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4" />
    </BaseMenu.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.Popup> & { sideOffset?: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={sideOffset} align="start">
        <BaseMenu.Popup
          data-slot="dropdown-menu-sub-content"
          className={cn(
            "bg-popover text-popover-foreground z-50 min-w-40 rounded-lg border p-1 shadow-overlay outline-none",
            className
          )}
          render={
            <motion.div
              initial={reduceMotion ? reduced.fadeIn.initial : depth.overlay.initial}
              animate={depth.overlay.animate}
              transition={reduceMotion ? fades.normal : springs.surface}
            />
          }
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuShortcut,
}
