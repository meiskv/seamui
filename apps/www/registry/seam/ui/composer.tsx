"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowUp, Square, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced, useMounted } from "@/lib/motion"
import { Badge } from "./badge"
import { Button } from "./button"
import { Textarea } from "./textarea"

type ComposerStatus = "ready" | "streaming"

type ComposerContextValue = {
  status: ComposerStatus
  onStop?: () => void
}

const ComposerContext = React.createContext<ComposerContextValue | null>(null)

function useComposer() {
  const ctx = React.useContext(ComposerContext)
  if (!ctx) {
    throw new Error("Composer parts must be used within <Composer>.")
  }
  return ctx
}

// The signature seam control: the whole surface is a debossed well the user
// acts into. The send key inside it is the embossed token that fires the
// action — slot vs token, the design language in one component.
function Composer({
  className,
  status = "ready",
  onStop,
  ...props
}: React.ComponentProps<"form"> & {
  status?: ComposerStatus
  onStop?: () => void
}) {
  return (
    <ComposerContext.Provider value={{ status, onStop }}>
      <form
        data-slot="composer"
        data-status={status}
        className={cn(
          "bg-muted flex w-full flex-col gap-1.5 rounded-2xl squircle border border-border/60 p-2 shadow-well",
          "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/50",
          className
        )}
        {...props}
      />
    </ComposerContext.Provider>
  )
}

// Reuses Textarea, stripped of its own border/shadow/background — the well
// provides all three. Enter submits, Shift+Enter inserts a newline; submitting
// never steals focus (requestSubmit leaves the caret in place).
function ComposerTextarea({
  className,
  onKeyDown,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyDown?.(e)
    if (e.defaultPrevented) return
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <Textarea
      data-slot="composer-textarea"
      rows={1}
      onKeyDown={handleKeyDown}
      className={cn(
        // shadow-none! (important) is required: `shadow-well` is a custom
        // utility twMerge can't dedupe against `shadow-none`, so both emit and
        // the inset well would otherwise win the cascade — a double-well.
        "max-h-40 min-h-9 border-0 bg-transparent px-2 py-1.5 shadow-none!",
        "focus-visible:border-0 focus-visible:ring-0",
        className
      )}
      {...props}
    />
  )
}

function ComposerToolbar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="composer-toolbar"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

function ComposerTools({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="composer-tools"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

// The embossed send key. While streaming it becomes a stop control (type
// switches to button so it no longer submits the form); the icon crossfades
// on opacity, which is identical under reduced motion.
function ComposerSubmit({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { status, onStop } = useComposer()
  const streaming = status === "streaming"

  return (
    <Button
      data-slot="composer-submit"
      type={streaming ? "button" : "submit"}
      size="icon"
      className={cn("ml-auto size-8 rounded-full", className)}
      onClick={streaming ? onStop : undefined}
      aria-label={streaming ? "Stop generating" : "Send message"}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={streaming ? "stop" : "send"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fades.fast}
          className="flex items-center justify-center"
        >
          {streaming ? <Square className="size-3.5" /> : <ArrowUp />}
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}

function ComposerAttachments({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="composer-attachments"
      className={cn("flex flex-wrap gap-1.5 px-1 pt-1", className)}
      {...props}
    />
  )
}

// A miniature embossed key resting inside the well. The remove affordance
// dogfoods Button (ghost, resized) rather than a hand-rolled close element.
function ComposerAttachment({
  className,
  children,
  onRemove,
  ...props
}: React.ComponentProps<typeof Badge> & { onRemove?: () => void }) {
  const reduceMotion = useReducedMotion()
  const mounted = useMounted()

  return (
    <motion.div
      layout={!reduceMotion}
      // gate the moving entrance behind mount (SSR hydration safety); chips
      // added after mount still animate in, and exit is unaffected.
      initial={
        mounted
          ? reduceMotion
            ? reduced.fadeIn.initial
            : depth.overlay.initial
          : false
      }
      animate={depth.overlay.animate}
      exit={reduceMotion ? reduced.fadeIn.exit : depth.overlay.exit}
      transition={reduceMotion ? fades.normal : springs.snappy}
    >
      <Badge
        data-slot="composer-attachment"
        variant="secondary"
        className={cn("gap-1 py-1 pr-1 pl-2", className)}
        {...props}
      >
        <span className="truncate">{children}</span>
        {onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            aria-label="Remove attachment"
            className="-mr-0.5 size-4 rounded-full [&_svg:not([class*='size-'])]:size-3"
          >
            <X />
          </Button>
        )}
      </Badge>
    </motion.div>
  )
}

export {
  Composer,
  ComposerTextarea,
  ComposerToolbar,
  ComposerTools,
  ComposerSubmit,
  ComposerAttachments,
  ComposerAttachment,
  useComposer,
}
