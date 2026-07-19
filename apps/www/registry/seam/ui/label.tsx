import type * as React from "react"

import { cn } from "@/lib/utils"

// A standalone label for controls outside a Field (inside a Field, prefer
// FieldLabel — it auto-associates). Plain <label> so it renders on the server.
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm font-medium leading-none select-none",
        "has-[[data-disabled]]:opacity-70 peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
}

export { Label }
