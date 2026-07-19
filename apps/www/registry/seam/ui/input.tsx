import type * as React from "react"
import { Input as BaseInput } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({
  className,
  ...props
}: React.ComponentProps<typeof BaseInput>) {
  return (
    <BaseInput
      data-slot="input"
      className={cn(
        // debossed — the field is carved into the surface (inset well shadow).
        // The file-input line-height fills the content box (leading-7.5 =
        // 30px = h-10 minus border and py-1 — the three are coupled): text
        // inputs center their own text, but a file input's button + filename
        // row is normal inline flow, which top-aligns; flex/items-center and
        // align-content are both ignored inside its internals. Resizing a
        // file input means overriding this leading with the same
        // `[&[type=file]]:leading-*` variant.
        "flex h-10 w-full min-w-0 rounded-md squircle border border-border/60 bg-muted px-3.5 py-1 text-sm shadow-well outline-none [&[type=file]]:leading-7.5",
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
        "disabled:pointer-events-none disabled:opacity-50 data-[invalid]:border-destructive data-[invalid]:ring-destructive/30",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className
      )}
      {...props}
    />
  )
}

export { Input }
