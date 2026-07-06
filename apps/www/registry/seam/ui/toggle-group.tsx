"use client"

import * as React from "react"
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group"

import { cn } from "@/lib/utils"

/**
 * A debossed well holding a set of Toggles — the pressed one rises out of it
 * as an embossed white key (seam design language). Use with the seamui
 * Toggle as items: <ToggleGroup><Toggle value="left">…</Toggle></ToggleGroup>
 */
function ToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseToggleGroup>) {
  return (
    <BaseToggleGroup
      data-slot="toggle-group"
      className={cn(
        "bg-muted shadow-well inline-flex w-fit items-center gap-1 rounded-lg squircle p-1.5",
        className
      )}
      {...props}
    />
  )
}

export { ToggleGroup }
