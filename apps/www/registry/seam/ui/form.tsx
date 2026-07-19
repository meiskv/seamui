"use client"

import type * as React from "react"
import { Form as BaseForm } from "@base-ui/react/form"

import { cn } from "@/lib/utils"

// A form that collects Field validity and focuses the first invalid control on
// submit. Pair with Field for per-row labels/errors; pass `errors` +
// `onClearErrors` to surface server-side validation.
function Form({ className, ...props }: React.ComponentProps<typeof BaseForm>) {
  return (
    <BaseForm
      data-slot="form"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  )
}

export { Form }
