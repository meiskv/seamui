"use client"

import type * as React from "react"
import { Progress as BaseProgress } from "@base-ui/react/progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof BaseProgress.Root>) {
  return (
    <BaseProgress.Root data-slot="progress" value={value} {...props}>
      <BaseProgress.Track
        data-slot="progress-track"
        className={cn(
          "bg-muted relative h-2 w-full overflow-hidden rounded-full",
          className
        )}
      >
        <BaseProgress.Indicator
          data-slot="progress-indicator"
          // Width is a layout dimension, so it eases with a duration (like the
          // accordion height) rather than a transform spring.
          className="bg-primary h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  )
}

export { Progress }
