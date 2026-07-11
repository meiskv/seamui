"use client"

import * as React from "react"
import { Meter as BaseMeter } from "@base-ui/react/meter"

import { cn } from "@/lib/utils"

function Meter({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMeter.Root>) {
  return (
    <BaseMeter.Root data-slot="meter" className={cn("grid gap-1.5", className)} {...props}>
      {children}
      <BaseMeter.Track
        data-slot="meter-track"
        className="bg-muted relative h-2 w-full overflow-hidden rounded-full"
      >
        <BaseMeter.Indicator
          data-slot="meter-indicator"
          className="bg-primary h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
        />
      </BaseMeter.Track>
    </BaseMeter.Root>
  )
}

function MeterLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Label>) {
  return (
    <BaseMeter.Label
      data-slot="meter-label"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

function MeterValue({
  className,
  ...props
}: React.ComponentProps<typeof BaseMeter.Value>) {
  return (
    <BaseMeter.Value
      data-slot="meter-value"
      className={cn("text-muted-foreground text-sm tabular-nums", className)}
      {...props}
    />
  )
}

export { Meter, MeterLabel, MeterValue }
