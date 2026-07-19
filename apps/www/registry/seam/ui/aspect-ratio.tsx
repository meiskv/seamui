import type * as React from "react"

import { cn } from "@/lib/utils"

// Constrains its content to a fixed width:height ratio via the CSS
// `aspect-ratio` property. No Base UI primitive needed — it's pure layout.
function AspectRatio({
  ratio = 1,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & { ratio?: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      style={{ aspectRatio: ratio, ...style }}
      className={cn("relative w-full", className)}
      {...props}
    />
  )
}

export { AspectRatio }
