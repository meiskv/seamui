"use client"

import type * as React from "react"
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog"

import { cn } from "@/lib/utils"
import { condense } from "@/lib/motion"

function AlertDialog(props: React.ComponentProps<typeof BaseAlertDialog.Root>) {
  return <BaseAlertDialog.Root {...props} />
}

function AlertDialogTrigger(
  props: React.ComponentProps<typeof BaseAlertDialog.Trigger>
) {
  return <BaseAlertDialog.Trigger data-slot="alert-dialog-trigger" {...props} />
}

function AlertDialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Popup>) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop
        data-slot="alert-dialog-backdrop"
        // seam condense: the page dims/undims on the same clock as the panel.
        className={cn("fixed inset-0 z-50 bg-black/50", condense.backdrop)}
      />
      <BaseAlertDialog.Popup
        data-slot="alert-dialog-content"
        className={cn(
          "bg-popover text-popover-foreground fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl squircle border p-6 shadow-modal outline-none",
          // seam condense: the modal pops up from center and fades in; on
          // dismiss it falls back and fades — Base UI awaits the CSS exit.
          condense.surface,
          className
        )}
        {...props}
      >
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "flex flex-col gap-1.5 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Title>) {
  return (
    <BaseAlertDialog.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Description>) {
  return (
    <BaseAlertDialog.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function AlertDialogAction(
  props: React.ComponentProps<typeof BaseAlertDialog.Close>
) {
  return <BaseAlertDialog.Close data-slot="alert-dialog-action" {...props} />
}

function AlertDialogCancel(
  props: React.ComponentProps<typeof BaseAlertDialog.Close>
) {
  return <BaseAlertDialog.Close data-slot="alert-dialog-cancel" {...props} />
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
