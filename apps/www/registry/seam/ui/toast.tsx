"use client"

import * as React from "react"
import { Toast as BaseToast } from "@base-ui/react/toast"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

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
      <BaseToast.Viewport className="fixed bottom-4 right-4 z-50 mx-auto flex w-[calc(100vw-2rem)] max-w-sm flex-col sm:right-4">
        {toasts.map((toast) => (
          <BaseToast.Root
            key={toast.id}
            toast={toast}
            data-slot="toast"
            // Base UI owns stacking + swipe transforms; seam adds a bouncy,
            // spring-shaped entrance/exit via a cubic-bezier on opacity/offset.
            className={cn(
              "bg-popover text-popover-foreground absolute inset-x-0 bottom-0 z-[calc(1000-var(--toast-index))] rounded-lg squircle border p-4 shadow-overlay",
              "[transition:transform_0.5s,opacity_0.35s] [transition-timing-function:cubic-bezier(0.22,1.3,0.36,1)] motion-reduce:[transition:opacity_0.35s]",
              "data-[starting-style]:translate-y-6 data-[starting-style]:opacity-0",
              "data-[ending-style]:translate-y-4 data-[ending-style]:opacity-0",
              "data-[ending-style]:[&[data-swipe-direction]]:translate-y-0"
            )}
            style={{
              // stack the toasts with a small vertical offset
              transform:
                "translateY(calc(var(--toast-index) * -0.75rem)) scale(calc(1 - var(--toast-index) * 0.05))",
            }}
          >
            <BaseToast.Title className="text-sm font-medium" />
            <BaseToast.Description className="text-muted-foreground text-sm" />
            <BaseToast.Close
              className="absolute right-3 top-3 rounded-md opacity-70 outline-none hover:opacity-100"
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
