"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The table itself is a raised key resting on the canvas (bg-card +
 * shadow-resting + squircle), not a well — rows are separated by hairlines
 * inside the surface.
 *
 * The scroll wrapper is a labeled `region`, but it only becomes a keyboard
 * **tab stop** when the table actually overflows — a table that fits adds no
 * phantom stop (per ARIA APG: give a scroll container `tabindex=0` only when
 * there's something to scroll). The label stays on the region either way.
 */
function Table({
  className,
  containerClassName,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...props
}: React.ComponentProps<"table"> & {
  /** Classes for the scrollable region wrapper (not the <table>). */
  containerClassName?: string
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [scrollable, setScrollable] = React.useState(false)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => setScrollable(el.scrollWidth > el.clientWidth + 1)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      data-slot="table-container"
      // the raised surface + the labeled scroll region; a tab stop only when
      // the table overflows (no phantom stop on tables that fit).
      role="region"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      tabIndex={scrollable ? 0 : undefined}
      className={cn(
        "squircle bg-card text-card-foreground w-full overflow-x-auto rounded-xl border border-border/60 shadow-resting",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        containerClassName
      )}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      // a quiet label rail inside the surface — a strip, not a well (nothing
      // is typed *into* the header, so no inset shadow).
      className={cn(
        "bg-muted/60 [&_tr]:border-b [&_tr]:border-border/60",
        className
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/60 border-t border-border/60 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      // Selected rows tint (not emboss) — the checkbox is the embossed token.
      // The tint rides the seam `fades.fast` clock (120ms ease-out); a colour
      // fade, so it stays correct under reduced motion.
      className={cn(
        "border-b border-border/60 transition-colors duration-[120ms] ease-out hover:bg-muted/40 data-[state=selected]:bg-secondary",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-muted-foreground h-11 px-3 text-left align-middle text-xs font-medium whitespace-nowrap",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-3 py-2.5 align-middle",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-3 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
}
