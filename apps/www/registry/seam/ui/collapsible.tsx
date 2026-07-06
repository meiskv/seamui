"use client"

import * as React from "react"
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible"

import { cn } from "@/lib/utils"

function Collapsible(
  props: React.ComponentProps<typeof BaseCollapsible.Root>
) {
  return <BaseCollapsible.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger(
  props: React.ComponentProps<typeof BaseCollapsible.Trigger>
) {
  return (
    <BaseCollapsible.Trigger data-slot="collapsible-trigger" {...props} />
  )
}

function CollapsibleContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseCollapsible.Panel>) {
  return (
    <BaseCollapsible.Panel
      data-slot="collapsible-content"
      // Height eased between 0 and Base UI's measured value (see Accordion).
      className={cn(
        "h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 ease-out motion-reduce:transition-none",
        "data-[starting-style]:h-0 data-[ending-style]:h-0",
        className
      )}
      {...props}
    >
      {children}
    </BaseCollapsible.Panel>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
