import type * as React from "react"
import { Input as BaseInput } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof BaseInput> & {
  /**
   * default — the debossed entry well.
   * ghost   — naked inline field, for editing in place inside a toolbar or a
   *           table cell. Mirrors SelectTrigger's variant of the same name.
   */
  variant?: "default" | "ghost"
}) {
  return (
    <BaseInput
      data-slot="input"
      className={cn(
        // The file-input line-height fills the content box (leading-7.5 =
        // 30px = h-10 minus border and py-1 — the three are coupled): text
        // inputs center their own text, but a file input's button + filename
        // row is normal inline flow, which top-aligns; flex/items-center and
        // align-content are both ignored inside its internals. Resizing a
        // file input means overriding this leading with the same
        // `[&[type=file]]:leading-*` variant.
        "flex h-10 w-full min-w-0 rounded-md squircle border py-1 text-sm outline-none [&[type=file]]:leading-7.5",
        // debossed — the field is carved into the surface (inset well shadow).
        variant === "default" &&
          "border-border/60 bg-muted px-3.5 shadow-well focus-visible:border-ring",
        // no well and no stroke until you touch it — the border stays in the
        // box model (transparent) so focus doesn't shift the layout.
        variant === "ghost" &&
          "border-transparent bg-transparent px-2 hover:bg-muted/50",
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:opacity-50",
        // Both hooks, like Textarea: Base UI's Field sets `data-invalid`, while
        // a plain <Input aria-invalid> is what you write outside a Field.
        "aria-invalid:border-destructive aria-invalid:ring-destructive/30 data-[invalid]:border-destructive data-[invalid]:ring-destructive/30",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className
      )}
      {...props}
    />
  )
}

export { Input }
