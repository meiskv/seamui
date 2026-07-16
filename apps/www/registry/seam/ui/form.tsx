import type * as React from "react"
import { Form as BaseForm } from "@base-ui/react/form"

import { cn } from "@/lib/utils"

// Base UI Form: native <form> with consolidated error handling. Field
// validation, focus-first-invalid on submit, and external (server) errors via
// the `errors` prop all come from Base UI; seamui adds the roomy stacked
// layout. Pair with Field — `onFormSubmit` receives the values keyed by each
// Field's `name`.
function Form<
  FormValues extends Record<string, unknown> = Record<string, unknown>,
>({ className, ...props }: React.ComponentProps<typeof BaseForm<FormValues>>) {
  return (
    <BaseForm
      data-slot="form"
      className={cn("flex w-full flex-col gap-5", className)}
      {...props}
    />
  )
}

export { Form }
