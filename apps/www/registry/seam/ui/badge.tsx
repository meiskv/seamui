import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // a miniature key — embossed chips get shadow-resting, outline stays flat.
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-md squircle border px-2.5 py-0.5 text-xs font-medium select-none [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-resting",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-resting",
        destructive:
          "border-transparent bg-destructive text-white shadow-resting",
        outline: "border-border/60 text-foreground",
        // debossed — a chip carved into the surface, for quiet/passive status.
        muted: "border-border/60 bg-muted text-muted-foreground shadow-well",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
