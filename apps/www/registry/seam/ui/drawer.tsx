"use client"

import * as React from "react"
import { Drawer as BaseDrawer } from "@base-ui/react/drawer"

import { cn } from "@/lib/utils"

// The Drawer leans entirely on Base UI's native drawer engine: spring-based
// open, swipe-to-dismiss, and a backdrop that dims as you drag. That physics
// IS the seam mobile-depth philosophy, so we style it and stay out of its way.

function Drawer(props: React.ComponentProps<typeof BaseDrawer.Root>) {
  return <BaseDrawer.Root {...props} />
}

function DrawerTrigger(props: React.ComponentProps<typeof BaseDrawer.Trigger>) {
  return <BaseDrawer.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Popup>) {
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop
        data-slot="drawer-backdrop"
        className="fixed inset-0 z-50 bg-black/50"
      />
      <BaseDrawer.Popup
        data-slot="drawer-content"
        className={cn(
          "bg-popover text-popover-foreground fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[90vh] w-full max-w-md flex-col gap-4 rounded-t-2xl squircle border-t p-6 shadow-modal outline-none",
          className
        )}
        {...props}
      >
        <div
          aria-hidden
          className="bg-muted mx-auto h-1.5 w-10 shrink-0 rounded-full"
        />
        {children}
      </BaseDrawer.Popup>
    </BaseDrawer.Portal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Title>) {
  return (
    <BaseDrawer.Title
      data-slot="drawer-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Description>) {
  return (
    <BaseDrawer.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

const DrawerClose = BaseDrawer.Close

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
}
