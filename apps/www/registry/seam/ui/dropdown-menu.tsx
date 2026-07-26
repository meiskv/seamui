"use client"

import * as React from "react"
import { Menu as BaseMenu } from "@base-ui/react/menu"
import { motion, useReducedMotion } from "motion/react"
import { Check, ChevronLeft, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"
import { condense, drill, fades, reduced, springs } from "@/lib/motion"
import { useHaptics } from "@/lib/haptics"

// Shared item shape so Item / CheckboxItem / RadioItem / SubTrigger stay in sync.
const menuItemClass =
  "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0"

/* ────────────────────────────────────────────────────────────────────────────
 * Nested menus drill *into* the popup instead of flying out beside it.
 *
 * A submenu doesn't open a second surface anchored to its trigger; it replaces
 * the level below it inside the one popup, which springs to the new level's
 * size. Depth is unlimited and costs no horizontal room — the reason to do it
 * this way — and it behaves the same on a phone as on a wide desktop.
 *
 * The whole thing is one piece of state: `path`, the list of submenus you've
 * opened. The panel at `depth === path.length` is the one on screen. Levels
 * you've drilled past stay mounted and hidden (see `useParked` — it's what
 * keeps their uncontrolled state alive); levels off the open path aren't
 * mounted at all, exactly like a closed flyout submenu.
 *
 * **Only the visible level's items are ever rendered**, and that is
 * load-bearing, not cosmetic. Base UI's Menu is a composite: it registers items
 * by DOM node and roves focus across them, skipping any that `checkVisibility()`
 * says aren't rendered. So a level that lingered *visibly* to animate out would
 * be a level whose items still answer to the arrow keys — which is why the
 * outgoing level goes the instant the path changes, and the incoming level
 * carries the transition on its own (see `drill` in @/lib/motion).
 * ──────────────────────────────────────────────────────────────────────────── */

type DropdownLevel = {
  id: string
  /** What the level's back row is labelled with — the sub-trigger's content. */
  label: React.ReactNode
}

type DropdownNav = {
  path: DropdownLevel[]
  /** 1 drilling in, -1 stepping back — which way the incoming level slides. */
  direction: 1 | -1
  /** False until the first drill of this open, so the root level never slides
   *  in behind the popup's own entrance. */
  navigated: boolean
  /** After stepping back, the sub whose trigger focus should return to. */
  returnTo?: string
}

const AT_ROOT: DropdownNav = { path: [], direction: 1, navigated: false }

const DropdownNavContext = React.createContext<
  | (DropdownNav & {
      push: (level: DropdownLevel) => void
      pop: () => void
    })
  | null
>(null)

function useDropdownNav() {
  const nav = React.useContext(DropdownNavContext)
  if (!nav) {
    throw new Error(
      "seamui: dropdown menu parts must be used inside <DropdownMenu>"
    )
  }
  return nav
}

/** The level a part is rendered into, and whether that level is the visible one. */
const DropdownPanelContext = React.createContext<{
  depth: number
  active: boolean
}>({ depth: 0, active: true })

/** How the viewport finds the level it should be sized to. */
const ACTIVE_PANEL = '[data-slot="dropdown-menu-panel"][data-active]'

/**
 * Parts on a level you've drilled past render hidden rather than not at all.
 *
 * Unmounting them would be simpler, but it throws away any uncontrolled state
 * they hold: a `defaultChecked` checkbox or a `defaultValue` radio group would
 * silently reset every time you drilled past its level and came back. A flyout
 * submenu never did that — the level underneath stayed mounted — so neither
 * should this.
 *
 * Hiding keeps the state and still keeps the parts out of the keyboard's way:
 * Base UI's list navigation runs `checkVisibility()` over the items it has
 * registered and skips the ones that aren't rendered. Comes last in `cn` so it
 * wins the display conflict against `flex` (and anything a caller passed).
 *
 * Levels *not* on the open path stay unmounted — that's a closed submenu, and
 * it dropped its uncontrolled state before this change too.
 */
function useParked(): string | undefined {
  const { active } = React.useContext(DropdownPanelContext)
  return active ? undefined : "hidden"
}

const DropdownSubContext = React.createContext<{ id: string } | null>(null)

function DropdownMenu({
  onOpenChange,
  onOpenChangeComplete,
  ...props
}: React.ComponentProps<typeof BaseMenu.Root>) {
  const [nav, setNav] = React.useState<DropdownNav>(AT_ROOT)

  // Base UI holds onto its open-change handler, so read the path off a ref
  // rather than the closure to decide what Escape means.
  const navRef = React.useRef(nav)
  navRef.current = nav

  const push = React.useCallback((level: DropdownLevel) => {
    setNav((prev) => ({
      path: [...prev.path, level],
      direction: 1,
      navigated: true,
    }))
  }, [])

  const pop = React.useCallback(() => {
    setNav((prev) => ({
      path: prev.path.slice(0, -1),
      direction: -1,
      navigated: true,
      returnTo: prev.path.at(-1)?.id,
    }))
  }, [])

  const value = React.useMemo(() => ({ ...nav, push, pop }), [nav, push, pop])

  return (
    <DropdownNavContext.Provider value={value}>
      <BaseMenu.Root
        onOpenChange={(open, details) => {
          // Escape inside a nested level steps back one level instead of
          // dismissing everything — what a flyout submenu would have done.
          if (
            !open &&
            details.reason === "escape-key" &&
            navRef.current.path.length > 0
          ) {
            details.cancel()
            pop()
            return
          }
          onOpenChange?.(open, details)
        }}
        onOpenChangeComplete={(open) => {
          // Back to the root level only once the popup has finished leaving, so
          // reopening never flashes the level the user drilled into.
          if (!open) setNav(AT_ROOT)
          onOpenChangeComplete?.(open)
        }}
        {...props}
      />
    </DropdownNavContext.Provider>
  )
}

function DropdownMenuTrigger(
  props: React.ComponentProps<typeof BaseMenu.Trigger>
) {
  return <BaseMenu.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

/**
 * The clipping box every level is drawn into. Springs between the size of the
 * level you left and the size of the one you entered, so the popup grows and
 * shrinks around the content instead of jumping.
 */
function DropdownMenuViewport({ children }: { children?: React.ReactNode }) {
  const { path, navigated, returnTo } = useDropdownNav()
  const reduceMotion = useReducedMotion() ?? false
  const viewportRef = React.useRef<HTMLDivElement | null>(null)
  const [size, setSize] = React.useState<{
    width: number
    height: number
  } | null>(null)

  // The visible level is found in the DOM rather than handed over by a ref.
  // The root level's element never unmounts — it only stops being active — so a
  // ref on it isn't re-attached when you step back into it, and the viewport
  // would keep the size of the level you just left. `data-active` is always
  // right by the time layout effects run.
  const measure = React.useCallback(() => {
    const viewport = viewportRef.current
    const panel = viewport?.querySelector<HTMLElement>(ACTIVE_PANEL)
    if (!viewport || !panel) return
    // Read the level at its *natural* size. The panel stretches to the viewport
    // (`min-w-full`), so measuring while the viewport still holds the previous
    // level's width would floor every level at the widest one before it —
    // releasing the inline size is what lets a level get narrower. The restore
    // happens in the same layout pass, so nothing paints at the released size.
    const { width, height } = viewport.style
    viewport.style.width = "auto"
    viewport.style.height = "auto"
    const next = { width: panel.offsetWidth, height: panel.offsetHeight }
    viewport.style.width = width
    viewport.style.height = height
    setSize((prev) =>
      prev && prev.width === next.width && prev.height === next.height
        ? prev
        : next
    )
  }, [])

  // Re-measure whenever the level changes, and keep up with content that
  // changes *within* a level too — a checkbox row gaining an indicator, an
  // async label landing.
  React.useLayoutEffect(() => {
    measure()
    const panel = viewportRef.current?.querySelector<HTMLElement>(ACTIVE_PANEL)
    if (!panel || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver(measure)
    observer.observe(panel)
    return () => observer.disconnect()
  }, [measure, path])

  // Move focus onto the level a drill lands on. Base UI does this itself when
  // items *mount*, but levels here are hidden rather than unmounted, so nothing
  // moves and focus would sit on the popup — a keyboard user would drill in and
  // see no highlight at all. Skipped before the first drill, where Base UI's own
  // open focus is correct.
  //
  // Stepping back returns to the trigger you left through, like a flyout
  // submenu closing. Drilling in lands on the back row: it is the level's first
  // row, and it announces which level you just entered.
  React.useEffect(() => {
    if (!navigated) return
    const panel = viewportRef.current?.querySelector<HTMLElement>(ACTIVE_PANEL)
    if (!panel) return
    const restored = returnTo
      ? panel.querySelector<HTMLElement>(
          `[data-sub-id="${CSS.escape(returnTo)}"]`
        )
      : null
    ;(
      restored ?? panel.querySelector<HTMLElement>('[role^="menuitem"]')
    )?.focus()
  }, [navigated, path, returnTo])

  return (
    <motion.div
      ref={viewportRef}
      data-slot="dropdown-menu-viewport"
      // The popup is the `role="menu"`; this and the panels are layout only, so
      // they step out of the a11y tree and leave the items as its children.
      role="presentation"
      className="relative min-w-full overflow-hidden"
      // No entrance of its own — the popup's `condense.surface` covers the open,
      // and the first measured size is applied without animating.
      initial={false}
      animate={size ?? {}}
      transition={reduceMotion ? reduced.instant : springs.snappy}
    >
      {children}
    </motion.div>
  )
}

/**
 * One level of the menu. A level you've drilled *past* stays mounted as a
 * `display: contents` wrapper — it draws nothing and lays nothing out, but it
 * keeps the branch holding the visible level in place.
 *
 * That the wrapper never changes element type is deliberate. Swapping it for a
 * fragment when the level goes off screen remounts everything under it, and a
 * remounted `DropdownMenuSub` gets a fresh `useId` — the level you just opened
 * would stop recognising its own entry in `path` and vanish. Levels move
 * between visible and parked; they don't come and go.
 *
 * So the entrance is expressed as a target rather than a mount: parked levels
 * sit at `drill.enter(-1)` (off to the left, where you left them) and animate to
 * `drill.settle` when they come back. Levels *deeper* than the current one
 * aren't mounted at all, so those do enter on mount, from the right.
 */
function DropdownMenuPanel({
  depth,
  className,
  children,
}: {
  depth: number
  className?: string
  children?: React.ReactNode
}) {
  const { path, direction, navigated } = useDropdownNav()
  const reduceMotion = useReducedMotion() ?? false
  const active = depth === path.length

  const value = React.useMemo(() => ({ depth, active }), [depth, active])

  return (
    <DropdownPanelContext.Provider value={value}>
      <motion.div
        data-slot="dropdown-menu-panel"
        data-active={active || undefined}
        role="presentation"
        // `w-max` so the level keeps its natural width while the viewport
        // springs; `min-w-full` so it still fills a wider popup.
        className={active ? cn("w-max min-w-full", className) : "contents"}
        initial={
          navigated
            ? reduceMotion
              ? reduced.fadeIn.initial
              : drill.enter(direction)
            : false
        }
        animate={
          active
            ? reduceMotion
              ? reduced.fadeIn.animate
              : drill.settle
            : reduceMotion
              ? reduced.fadeIn.initial
              : drill.enter(-1)
        }
        // Parking is instant: a level has to be fully at its offset before it
        // can come back, or a quick out-and-back enters from half a slide.
        transition={
          active
            ? reduceMotion
              ? fades.fast
              : springs.snappy
            : reduced.instant
        }
      >
        {children}
      </motion.div>
    </DropdownPanelContext.Provider>
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 6,
  align = "start",
  onKeyDown,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.Popup> & {
  sideOffset?: number
  align?: "start" | "center" | "end"
}) {
  const { path, pop } = useDropdownNav()

  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={sideOffset} align={align}>
        <BaseMenu.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "bg-popover text-popover-foreground z-50 w-max min-w-40 rounded-lg squircle border p-1 shadow-overlay outline-none",
            condense.surface,
            className
          )}
          onKeyDown={(event) => {
            onKeyDown?.(event)
            if (event.defaultPrevented) return
            // ArrowLeft steps back out of a level, mirroring how it closes a
            // flyout submenu.
            if (event.key === "ArrowLeft" && path.length > 0) {
              event.preventDefault()
              pop()
            }
          }}
          {...props}
        >
          <DropdownMenuViewport>
            <DropdownMenuPanel depth={0}>{children}</DropdownMenuPanel>
          </DropdownMenuViewport>
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

function DropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Item>) {
  const parked = useParked()

  return (
    <BaseMenu.Item
      data-slot="dropdown-menu-item"
      className={cn(menuItemClass, className, parked)}
      {...props}
    />
  )
}

function DropdownMenuGroup({
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.Group>) {
  // Not hidden when parked, unlike the parts inside it: a group can contain the
  // sub whose level is on screen, and hiding it would hide that too. Its own
  // items hide themselves.
  return (
    <BaseMenu.Group data-slot="dropdown-menu-group" {...props}>
      {children}
    </BaseMenu.Group>
  )
}

// A plain styled label so it works standalone in the menu (matching the
// shadcn API). Base UI's Menu.GroupLabel requires a wrapping Menu.Group and
// throws otherwise; use DropdownMenuGroup when you want a labelled group.
function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const parked = useParked()

  return (
    <div
      data-slot="dropdown-menu-label"
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        className,
        parked
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseMenu.Separator>) {
  const parked = useParked()

  return (
    <BaseMenu.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className, parked)}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  onCheckedChange,
  ...props
}: React.ComponentProps<typeof BaseMenu.CheckboxItem>) {
  // Toggling a checkbox item commits state — fire the seam tick (§3b).
  const { trigger } = useHaptics()
  const parked = useParked()

  return (
    <BaseMenu.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(menuItemClass, "pl-8", className, parked)}
      onCheckedChange={(
        ...args: Parameters<NonNullable<typeof onCheckedChange>>
      ) => {
        trigger("tick")
        onCheckedChange?.(...args)
      }}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <BaseMenu.CheckboxItemIndicator>
          <Check className="size-4" strokeWidth={3} />
        </BaseMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseMenu.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  onValueChange,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioGroup>) {
  // Selecting a different radio item commits state — fire the seam tick (§3b).
  const { trigger } = useHaptics()

  // Never swapped out or hidden when parked: unmounting it would drop an
  // uncontrolled `defaultValue`, and hiding it would hide a sub nested inside
  // it. Its items hide themselves.
  return (
    <BaseMenu.RadioGroup
      data-slot="dropdown-menu-radio-group"
      onValueChange={(
        ...args: Parameters<NonNullable<typeof onValueChange>>
      ) => {
        trigger("tick")
        onValueChange?.(...args)
      }}
      {...props}
    >
      {children}
    </BaseMenu.RadioGroup>
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.RadioItem>) {
  const parked = useParked()

  return (
    <BaseMenu.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(menuItemClass, "pl-8", className, parked)}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <BaseMenu.RadioItemIndicator>
          <Circle className="size-2 fill-current" />
        </BaseMenu.RadioItemIndicator>
      </span>
      {children}
    </BaseMenu.RadioItem>
  )
}

/**
 * Groups a nested level with the row that opens it. Nests to any depth — a
 * `DropdownMenuSub` inside a `DropdownMenuSubContent` is just the next level.
 */
function DropdownMenuSub({ children }: { children?: React.ReactNode }) {
  const id = React.useId()
  const value = React.useMemo(() => ({ id }), [id])
  return (
    <DropdownSubContext.Provider value={value}>
      {children}
    </DropdownSubContext.Provider>
  )
}

function DropdownMenuSubTrigger({
  className,
  children,
  heading,
  onClick,
  onKeyDown,
  ...props
}: React.ComponentProps<typeof BaseMenu.Item> & {
  /** Overrides what the nested level's back row is labelled with. */
  heading?: React.ReactNode
}) {
  const sub = React.useContext(DropdownSubContext)
  const { push } = useDropdownNav()
  const { trigger } = useHaptics()
  const parked = useParked()
  if (!sub) return null

  const drillIn = () => {
    trigger("tap")
    push({ id: sub.id, label: heading ?? children })
  }

  return (
    <BaseMenu.Item
      data-slot="dropdown-menu-sub-trigger"
      data-sub-id={sub.id}
      className={cn(menuItemClass, className, parked)}
      // The popup stays open — the nested level replaces this one inside it.
      closeOnClick={false}
      onClick={(event) => {
        onClick?.(event)
        drillIn()
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return
        if (event.key === "ArrowRight") {
          event.preventDefault()
          drillIn()
        }
      }}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4 text-muted-foreground" />
    </BaseMenu.Item>
  )
}

/** The row that returns to the level below. Part of the roving focus order, so
 *  it's reachable by arrow keys as well as by ArrowLeft and Escape. */
function DropdownMenuBack({ children }: { children?: React.ReactNode }) {
  const { pop } = useDropdownNav()
  const { trigger } = useHaptics()
  const parked = useParked()

  return (
    <BaseMenu.Item
      data-slot="dropdown-menu-back"
      className={cn(menuItemClass, "gap-1.5 pl-1 font-medium", parked)}
      closeOnClick={false}
      onClick={() => {
        trigger("tap")
        pop()
      }}
    >
      <ChevronLeft className="size-4 text-muted-foreground" />
      {children}
    </BaseMenu.Item>
  )
}

function DropdownMenuSubContent({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  const sub = React.useContext(DropdownSubContext)
  const { depth } = React.useContext(DropdownPanelContext)
  const { path } = useDropdownNav()

  // Mount only on the open path — one level per depth, and nothing below the
  // one on screen.
  const level = path[depth]
  if (!sub || level?.id !== sub.id) return null

  return (
    <DropdownMenuPanel depth={depth + 1} className={className}>
      <DropdownMenuBack>{level.label}</DropdownMenuBack>
      <DropdownMenuSeparator />
      {children}
    </DropdownMenuPanel>
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuShortcut,
}
