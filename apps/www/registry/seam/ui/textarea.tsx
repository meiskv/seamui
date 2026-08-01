import type * as React from "react"

import { cn } from "@/lib/utils"

// Base UI has no Textarea part, so this renders a native <textarea> styled as
// a seam entry well. Inside a Base UI Field, use
// <Field.Control render={<Textarea />} /> to get label/validation wiring.
function Textarea({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"textarea"> & {
  /**
   * default — the debossed entry well.
   * ghost   — naked inline field, for composing in place. Mirrors Input and
   *           SelectTrigger's variant of the same name.
   */
  variant?: "default" | "ghost"
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // field-sizing-content lets the field grow with its content.
        "flex field-sizing-content min-h-20 w-full min-w-0 resize-none rounded-md squircle border py-2.5 text-sm outline-none",
        // debossed — the field is carved into the surface (inset well shadow).
        variant === "default" &&
          "border-border/60 bg-muted px-3.5 shadow-well focus-visible:border-ring",
        // transparent border keeps the box model stable when focus lands.
        variant === "ghost" &&
          "border-transparent bg-transparent px-2 hover:bg-muted/50",
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/30 data-[invalid]:border-destructive data-[invalid]:ring-destructive/30",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
