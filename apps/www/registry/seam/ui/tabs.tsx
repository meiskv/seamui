"use client"

import * as React from "react"
import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs } from "@/lib/motion"

// Each Tabs instance gets a unique layoutId so multiple tab groups on one
// page don't share (and fight over) the sliding indicator.
const TabsLayoutContext = React.createContext<string>("seam-tabs")

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Root>) {
  const layoutId = React.useId()
  return (
    <TabsLayoutContext.Provider value={layoutId}>
      <BaseTabs.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </TabsLayoutContext.Provider>
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      data-slot="tabs-list"
      className={cn(
        // recessed well — grouped controls sit below the surface; the active
        // one rises as a white key (seam design language).
        "bg-muted text-muted-foreground shadow-well inline-flex w-fit items-center gap-1 rounded-lg squircle p-1.5",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseTabs.Tab>) {
  const layoutId = React.useContext(TabsLayoutContext)
  const reduceMotion = useReducedMotion()

  return (
    <BaseTabs.Tab
      data-slot="tabs-trigger"
      {...props}
      render={(tabProps, state) => {
        const { className: baseClassName, ...rest } =
          tabProps as React.ComponentProps<"button">
        return (
          <button
            {...rest}
            className={cn(
              baseClassName,
              "relative inline-flex items-center justify-center rounded-md squircle px-3.5 py-2 text-sm font-medium outline-none transition-colors",
              state.active ? "text-foreground" : "text-muted-foreground",
              "focus-visible:ring-2 focus-visible:ring-ring/50",
              className
            )}
          >
            {state.active &&
              (reduceMotion ? (
                <span className="bg-secondary shadow-resting absolute inset-0 z-0 rounded-md squircle" />
              ) : (
                // seam motion: the indicator springs to the active tab.
                <motion.span
                  layoutId={layoutId}
                  transition={springs.snappy}
                  className="bg-secondary shadow-resting absolute inset-0 z-0 rounded-md squircle"
                />
              ))}
            <span className="relative z-10">{children}</span>
          </button>
        )
      }}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Panel>) {
  return (
    <BaseTabs.Panel
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
