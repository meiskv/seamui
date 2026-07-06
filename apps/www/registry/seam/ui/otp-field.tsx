"use client"

import * as React from "react"
import { OTPField as BaseOTPField } from "@base-ui/react/otp-field"

import { cn } from "@/lib/utils"

function OTPField({
  className,
  length = 6,
  ...props
}: React.ComponentProps<typeof BaseOTPField.Root>) {
  return (
    <BaseOTPField.Root
      data-slot="otp-field"
      length={length}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {/* Render one Input per slot; each derives its index from DOM order. */}
      {Array.from({ length }).map((_, i) => (
        <BaseOTPField.Input
          key={i}
          data-slot="otp-field-input"
          className={cn(
            "size-10 rounded-md squircle border border-border/60 bg-muted text-center text-sm shadow-well outline-none",
            "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
            "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          )}
        />
      ))}
    </BaseOTPField.Root>
  )
}

export { OTPField }
