import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

// Reduced motion swaps the rotation for an opacity pulse — feedback is never
// removed, it just stops traveling (seamui reduced-motion policy).
function Spinner({ className, ...props }: React.ComponentProps<typeof Loader2>) {
  return (
    <Loader2
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin motion-reduce:animate-pulse", className)}
      {...props}
    />
  )
}

export { Spinner }
