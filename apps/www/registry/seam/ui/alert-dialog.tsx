"use client"

import * as React from "react"
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs, depth, fades } from "@/lib/motion"

function AlertDialog(
  props: React.ComponentProps<typeof BaseAlertDialog.Root>
) {
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
  const reduceMotion = useReducedMotion()

  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop
        data-slot="alert-dialog-backdrop"
        className="fixed inset-0 z-50 bg-black/50"
        render={
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={fades.normal}
          />
        }
      />
      <BaseAlertDialog.Popup
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background text-foreground fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border p-6 shadow-modal outline-none",
          className
        )}
        render={
          <motion.div
            initial={reduceMotion ? false : depth.modal.initial}
            animate={depth.modal.animate}
            transition={springs.surface}
          />
        }
        {...props}
      >
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  )
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
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

const AlertDialogAction = BaseAlertDialog.Close
const AlertDialogCancel = BaseAlertDialog.Close

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
