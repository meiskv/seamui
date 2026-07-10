import * as React from "react"

import { cn } from "@/lib/utils"

// Base UI has no Textarea part, so this renders a native <textarea> styled as
// a seam entry well. Inside a Base UI Field, use
// <Field.Control render={<Textarea />} /> to get label/validation wiring.
function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // debossed — the field is carved into the surface (inset well shadow).
        // field-sizing-content lets the well grow with its content.
        "flex field-sizing-content min-h-20 w-full min-w-0 resize-none rounded-md squircle border border-border/60 bg-muted px-3.5 py-2.5 text-sm shadow-well outline-none",
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/30 data-[invalid]:border-destructive data-[invalid]:ring-destructive/30",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
