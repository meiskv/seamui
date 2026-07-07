"use client"

import * as React from "react"
import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs } from "@/lib/motion"

type TabsSize = "default" | "sm"

// Each Tabs instance gets a unique layoutId so multiple tab groups on one
// page don't share (and fight over) the sliding indicator.
const TabsLayoutContext = React.createContext<string>("seam-tabs")
// Size flows from the Root down to the List/Trigger via context so callers
// only set it in one place: <Tabs size="sm">.
const TabsSizeContext = React.createContext<TabsSize>("default")

function Tabs({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof BaseTabs.Root> & { size?: TabsSize }) {
  const layoutId = React.useId()
  return (
    <TabsLayoutContext.Provider value={layoutId}>
      <TabsSizeContext.Provider value={size}>
        <BaseTabs.Root
          data-slot="tabs"
          className={cn("flex flex-col gap-2", className)}
          {...props}
        />
      </TabsSizeContext.Provider>
    </TabsLayoutContext.Provider>
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.List>) {
  const size = React.useContext(TabsSizeContext)
  return (
    <BaseTabs.List
      data-slot="tabs-list"
      className={cn(
        // recessed well — grouped controls sit below the surface; the active
        // one rises as a white key (seam design language).
        "bg-muted text-muted-foreground shadow-well inline-flex w-fit items-center rounded-lg squircle",
        size === "sm" ? "gap-0.5 p-1" : "gap-1 p-1.5",
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
  const size = React.useContext(TabsSizeContext)
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
              "relative inline-flex items-center justify-center rounded-md squircle font-medium outline-none transition-colors",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-2 text-sm",
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
