"use client"

import * as React from "react"
import { PhoneOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

type VoiceControlBarContextValue = {
  expanded: boolean
  setExpanded: (v: boolean) => void
}
const VoiceControlBarContext =
  React.createContext<VoiceControlBarContextValue | null>(null)
function useVoiceControlBar() {
  const ctx = React.useContext(VoiceControlBarContext)
  if (!ctx)
    throw new Error(
      "VoiceControlBar parts must be used within <VoiceControlBar>."
    )
  return ctx
}

// The floating call pill — the capstone of the voice suite. It's a raised key
// at overlay depth (bg-card + shadow-overlay) holding a row of call controls,
// and it *morphs*: collapsed it's a rounded-full pill; expanded it grows a chat
// panel and squares off into a rounded card. The radius + padding shift is the
// one sanctioned duration case (a layout change that can't spring cleanly), so
// it rides a CSS transition paired with `motion-reduce:transition-none` — under
// reduced motion it snaps instead of easing, never freezing mid-morph.
function VoiceControlBar({
  className,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}) {
  const [internal, setInternal] = React.useState(defaultExpanded)
  const expanded = expandedProp ?? internal
  const setExpanded = (v: boolean) => {
    if (expandedProp === undefined) setInternal(v)
    onExpandedChange?.(v)
  }

  return (
    <VoiceControlBarContext.Provider value={{ expanded, setExpanded }}>
      <div
        data-slot="voice-control-bar"
        data-expanded={expanded || undefined}
        className={cn(
          "bg-card border-border/60 shadow-overlay flex w-fit flex-col border transition-[border-radius,padding] duration-300 ease-out motion-reduce:transition-none",
          expanded ? "squircle rounded-3xl p-2" : "rounded-full p-1.5",
          className
        )}
        {...props}
      />
    </VoiceControlBarContext.Provider>
  )
}

// The expand-to-chat region. It sits *above* the actions row and animates open
// with the grid-rows `0fr → 1fr` trick — a height morph that resolves cleanly
// with a plain CSS transition (motion.dev can't spring to `auto`). The inner
// element is `overflow-hidden` so its content is clipped while collapsed.
function VoiceControlBarPanel({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { expanded } = useVoiceControlBar()
  return (
    <div
      data-slot="voice-control-bar-panel"
      data-expanded={expanded || undefined}
      aria-hidden={!expanded}
      className={cn(
        "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "min-h-0 transition-[opacity,padding] duration-200 ease-out motion-reduce:transition-none",
            expanded
              ? "px-1 pt-1 pb-2 opacity-100"
              : "pointer-events-none opacity-0",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

// The controls row. Grouped call keys ride in the pill; keep it a simple flex
// track so the split control (MediaToggle + DeviceSelector) and the END key
// line up with generous, tappable spacing.
function VoiceControlBarActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="voice-control-bar-actions"
      className={cn("flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

// The chat toggle. Dogfoods Button and drives the panel's expanded state —
// aria-expanded/aria-pressed stay in sync so screen readers announce the morph.
function VoiceControlBarTrigger({
  className,
  onClick,
  "aria-label": ariaLabel,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { expanded, setExpanded } = useVoiceControlBar()
  return (
    <Button
      data-slot="voice-control-bar-trigger"
      variant="secondary"
      size="icon"
      aria-label={ariaLabel ?? (expanded ? "Close chat" : "Open chat")}
      aria-expanded={expanded}
      aria-pressed={expanded}
      className={cn(
        "size-10 rounded-full",
        expanded && "bg-secondary shadow-pressed",
        className
      )}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) setExpanded(!expanded)
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

// The hang-up key. A destructive-soft key (tinted, not solid) — a call-ending
// action you should notice, but which doesn't shout the way a full destructive
// button would. Dogfoods Button (secondary, so it keeps press depth) and
// overrides the surface tint; stays rounded-full like its sibling call keys.
function VoiceControlBarEnd({
  className,
  children,
  "aria-label": ariaLabel,
  ...props
}: React.ComponentProps<typeof Button>) {
  const iconOnly = children == null
  return (
    <Button
      data-slot="voice-control-bar-end"
      variant="secondary"
      size={iconOnly ? "icon" : "default"}
      aria-label={iconOnly ? (ariaLabel ?? "End call") : ariaLabel}
      className={cn(
        "bg-destructive/15 text-destructive hover:bg-destructive/25 hover:text-destructive gap-1.5 rounded-full font-semibold",
        iconOnly ? "size-10" : "h-10 px-4",
        className
      )}
      {...props}
    >
      <PhoneOff className="size-4" />
      {children}
    </Button>
  )
}

export {
  VoiceControlBar,
  VoiceControlBarPanel,
  VoiceControlBarActions,
  VoiceControlBarTrigger,
  VoiceControlBarEnd,
  useVoiceControlBar,
}
