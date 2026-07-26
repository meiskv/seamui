"use client"

import * as React from "react"
import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs, reduced, useReducedMotion } from "@/lib/motion"
import { useHaptics } from "@/lib/haptics"
import { buttonVariants } from "./button"

type TabsSize = "default" | "sm"

// Size flows from the Root down to the List/Trigger via context so callers
// only set it in one place: <Tabs size="sm">.
const TabsSizeContext = React.createContext<TabsSize>("default")

// useLayoutEffect on the client (position the indicator before the first
// painted frame), useEffect on the server (where it would only warn).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

function Tabs({
  className,
  size = "default",
  onValueChange,
  ...props
}: React.ComponentProps<typeof BaseTabs.Root> & { size?: TabsSize }) {
  // Switching tabs commits a selection — fire the seam tick (§3b).
  const { trigger } = useHaptics()
  return (
    <TabsSizeContext.Provider value={size}>
      <BaseTabs.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        onValueChange={(
          ...args: Parameters<NonNullable<typeof onValueChange>>
        ) => {
          trigger("tick")
          onValueChange?.(...args)
        }}
        {...props}
      />
    </TabsSizeContext.Provider>
  )
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseTabs.List>) {
  const size = React.useContext(TabsSizeContext)
  const reduceMotion = useReducedMotion()
  const listRef = React.useRef<HTMLDivElement>(null)
  const [box, setBox] = React.useState<{ left: number; width: number } | null>(
    null
  )

  // The indicator is ONE element owned by the list, tracking the selected
  // tab's horizontal box — not a `layoutId` handing off between per-tab
  // elements. Shared-layout projection interpolates the full box, so it
  // animated a vertical component too (a visible dip on the way across);
  // here `y` can't move, because only `x`/`width` are ever animated.
  useIsomorphicLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const measure = () => {
      // Keyed on aria-selected — the ARIA contract, not Base UI's internal
      // `data-active` naming.
      const active = list.querySelector<HTMLElement>(
        '[data-slot="tabs-trigger"][aria-selected="true"]'
      )
      setBox(
        active ? { left: active.offsetLeft, width: active.offsetWidth } : null
      )
    }

    measure()
    // Re-measure when selection moves, and when the list reflows (a resize,
    // a font swap, tabs added or removed).
    const selection = new MutationObserver(measure)
    selection.observe(list, {
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-selected"],
      childList: true,
    })
    const resize = new ResizeObserver(measure)
    resize.observe(list)
    return () => {
      selection.disconnect()
      resize.disconnect()
    }
  }, [])

  return (
    <BaseTabs.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        // recessed well — grouped controls sit below the surface; the active
        // one rises as a white key (seam design language).
        "bg-muted text-muted-foreground shadow-well relative inline-flex w-fit items-center rounded-lg squircle",
        size === "sm" ? "gap-0.5 p-1" : "gap-1 p-1.5",
        className
      )}
      {...props}
    >
      {box ? (
        <motion.span
          aria-hidden
          data-slot="tabs-indicator"
          className={cn(
            "bg-secondary shadow-resting absolute left-0 z-0 rounded-md squircle",
            // inset to the well's padding, so the key sits inside the groove
            size === "sm" ? "top-1 bottom-1" : "top-1.5 bottom-1.5"
          )}
          // `initial={false}` so the indicator appears in place on mount
          // instead of sliding in from the left on first paint.
          initial={false}
          animate={{ x: box.left, width: box.width }}
          // Reduced motion still moves the key — it just jumps (§5b).
          transition={reduceMotion ? reduced.instant : springs.snappy}
        />
      ) : null}
      {children}
    </BaseTabs.List>
  )
}

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseTabs.Tab>) {
  const size = React.useContext(TabsSizeContext)

  return (
    <BaseTabs.Tab
      data-slot="tabs-trigger"
      {...props}
      // The trigger is a button, so it wears the seam Button's own styling —
      // buttonVariants (ghost + size) is the single source of truth. We reuse
      // the cva rather than the Button component itself: Base UI's Tab manages
      // roving focus via the rendered element's ref, and an extra wrapper
      // breaks arrow-key navigation. The tab keeps its signature — a
      // transparent key with the active indicator springing between tabs — so
      // the ghost hover fill is neutralised.
      render={(tabProps, state) => {
        const { className: baseClassName, ...rest } =
          tabProps as React.ComponentProps<"button">
        return (
          <button
            {...rest}
            className={cn(
              baseClassName,
              buttonVariants({
                variant: "ghost",
                size: size === "sm" ? "sm" : "default",
              }),
              "relative hover:bg-transparent",
              state.active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
              className
            )}
          >
            {/* The active key itself is drawn once by TabsList, which springs
                it between tabs along x — see the indicator there. */}
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
