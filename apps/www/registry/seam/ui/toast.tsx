"use client"

import type * as React from "react"
import { Toast as BaseToast } from "@base-ui/react/toast"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { condense } from "@/lib/motion"
import { Button } from "./button"

/** Re-exported so callers can `const toast = useToast(); toast.add({ ... })`. */
const useToast = BaseToast.useToastManager

function ToastProvider({
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Provider>) {
  return (
    <BaseToast.Provider {...props}>
      {children}
      <Toaster />
    </BaseToast.Provider>
  )
}

function Toaster() {
  const { toasts } = BaseToast.useToastManager()

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        data-slot="toast-viewport"
        className="fixed bottom-4 right-4 z-50 mx-auto flex w-[calc(100vw-2rem)] max-w-sm flex-col sm:right-4"
      >
        {toasts.map((toast) => (
          <BaseToast.Root
            key={toast.id}
            toast={toast}
            data-slot="toast"
            className={cn(
              "bg-popover text-popover-foreground absolute inset-x-0 bottom-0 z-[calc(1000-var(--toast-index))] rounded-lg squircle border p-4 shadow-overlay",
              condense.toast
            )}
            style={{
              // stack the toasts with a small vertical offset
              transform:
                "translateY(calc(var(--toast-index) * -0.75rem)) scale(calc(1 - var(--toast-index) * 0.05))",
            }}
          >
            <BaseToast.Title
              data-slot="toast-title"
              className="text-sm font-medium"
            />
            <BaseToast.Description
              data-slot="toast-description"
              className="text-muted-foreground text-sm"
            />
            <BaseToast.Close
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground absolute right-2 top-2 size-8"
                />
              }
              aria-label="Close"
            >
              <X className="size-4" />
            </BaseToast.Close>
          </BaseToast.Root>
        ))}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  )
}

export { ToastProvider, Toaster, useToast }
