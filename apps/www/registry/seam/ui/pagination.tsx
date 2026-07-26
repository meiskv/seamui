"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { springs, useReducedMotion } from "@/lib/motion"
import { useHaptics } from "@/lib/haptics"
import { buttonVariants } from "./button"

// Each Pagination instance gets a unique layoutId so multiple paginations on
// one page don't share (and fight over) the sliding active key.
const PaginationLayoutContext = React.createContext<string>("seam-pagination")

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  const layoutId = React.useId()
  return (
    <PaginationLayoutContext.Provider value={layoutId}>
      <nav
        aria-label="pagination"
        data-slot="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
      />
    </PaginationLayoutContext.Provider>
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    // The debossed well the page keys sit in (the tabs-list shape) — the
    // active page rises from it as an embossed key.
    <ul
      data-slot="pagination-content"
      className={cn(
        "bg-muted text-muted-foreground shadow-well inline-flex w-fit items-center gap-1 rounded-lg squircle p-1.5",
        className
      )}
      {...props}
    />
  )
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="pagination-item"
      className={cn("flex", className)}
      {...props}
    />
  )
}

type PaginationLinkProps = React.ComponentProps<"a"> & {
  /** The current page — embossed key, `aria-current="page"`. */
  isActive?: boolean
  /** Non-navigable state for prev/next at the range ends. */
  disabled?: boolean
  size?: "default" | "icon"
}

// A page key is a link, not a button — wrapping it in the Button component
// would impose button semantics inside the pagination nav, so it wears
// buttonVariants directly (§5A option 2) and reuses the tabs signature: a
// transparent key whose embossed active state springs between links.
function PaginationLink({
  className,
  isActive,
  disabled,
  size = "icon",
  children,
  onClick,
  ...props
}: PaginationLinkProps) {
  const layoutId = React.useContext(PaginationLayoutContext)
  const reduceMotion = useReducedMotion()
  const { trigger } = useHaptics()

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: this renders an interactive link — biome just can't see the consumer's href through the spread.
    <a
      data-slot="pagination-link"
      data-active={isActive || undefined}
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      className={cn(
        buttonVariants({ variant: "ghost", size }),
        "relative hover:bg-transparent",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      // tactile feedback: committing a page change ticks (§3b); re-clicking
      // the active page is a no-op.
      // biome-ignore lint/a11y/useValidAnchor: the consumer supplies href via the spread; this handler only adds the haptic tick alongside real navigation.
      onClick={(e) => {
        if (!isActive && !disabled) trigger("tick")
        onClick?.(e)
      }}
      {...props}
    >
      {isActive &&
        (reduceMotion ? (
          <span className="bg-secondary shadow-resting absolute inset-0 z-0 rounded-md squircle" />
        ) : (
          // seam motion: the embossed key springs to the active page.
          <motion.span
            layoutId={layoutId}
            transition={springs.snappy}
            className="bg-secondary shadow-resting absolute inset-0 z-0 rounded-md squircle"
          />
        ))}
      <span className="relative z-10 inline-flex items-center gap-1">
        {children}
      </span>
    </a>
  )
}

function PaginationPrevious({
  className,
  ...props
}: Omit<PaginationLinkProps, "size" | "isActive">) {
  return (
    <PaginationLink
      data-slot="pagination-previous"
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-3.5", className)}
      {...props}
    >
      <ChevronLeft />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: Omit<PaginationLinkProps, "size" | "isActive">) {
  return (
    <PaginationLink
      data-slot="pagination-next"
      aria-label="Go to next page"
      size="default"
      className={cn("pr-3.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRight />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="pagination-ellipsis"
      aria-hidden
      className={cn("flex size-10 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
