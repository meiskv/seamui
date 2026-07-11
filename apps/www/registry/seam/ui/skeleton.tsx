import type * as React from "react"

import { cn } from "@/lib/utils"

// The pulse is opacity-only, which is the one animation seamui allows as a
// plain duration (see lib/motion fades) — it stays on under reduced motion
// because it doesn't travel. Loading feedback never goes dead.
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-muted animate-pulse rounded-md squircle shadow-well",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
