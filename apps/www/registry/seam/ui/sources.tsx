"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { ChevronDown, ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced } from "@/lib/motion"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Badge, badgeVariants } from "./badge"
import { buttonVariants } from "./button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible"
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "./preview-card"

// The "used N sources" disclosure that grounds an answer.
function Sources({ className, ...props }: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible data-slot="sources" className={cn("w-full", className)} {...props} />
  )
}

function SourcesTrigger({
  className,
  count,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger> & { count?: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <CollapsibleTrigger
      data-slot="sources-trigger"
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "group/sources text-muted-foreground w-fit gap-1.5 font-normal",
        className
      )}
      render={
        <motion.button
          whileTap={reduceMotion ? reduced.pressed : depth.pressed}
          transition={reduceMotion ? fades.fast : springs.press}
        />
      }
      {...props}
    >
      {children ?? (
        <>
          Used
          <Badge variant="muted" aria-hidden className="shadow-none">
            {count}
          </Badge>
          sources
        </>
      )}
      <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[panel-open]/sources:rotate-180 motion-reduce:transition-none" />
    </CollapsibleTrigger>
  )
}

function SourcesContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent data-slot="sources-content" {...props}>
      <div className={cn("flex flex-col gap-0.5 pt-1", className)}>{children}</div>
    </CollapsibleContent>
  )
}

// A favicon-and-title link. The favicon dogfoods Avatar (squared) with a
// numeric fallback; the external-link glyph reveals on hover/focus.
function Source({
  className,
  href,
  title,
  favicon,
  index,
  children,
  ...props
}: Omit<React.ComponentProps<"a">, "title"> & {
  title?: React.ReactNode
  favicon?: string
  index?: number
}) {
  return (
    <a
      data-slot="source"
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group/source hover:bg-accent flex items-center gap-2 rounded-md squircle px-2 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    >
      <Avatar className="size-5 rounded-sm">
        {favicon ? <AvatarImage src={favicon} alt="" /> : null}
        <AvatarFallback className="rounded-sm text-[0.625rem]">
          {index ?? "•"}
        </AvatarFallback>
      </Avatar>
      <span className="min-w-0 flex-1 truncate">{children ?? title}</span>
      <ExternalLink className="text-muted-foreground size-3.5 shrink-0 opacity-0 transition-opacity group-hover/source:opacity-100 group-focus-visible/source:opacity-100 motion-reduce:transition-none" />
    </a>
  )
}

// A superscript citation chip in running text. It's quiet metadata carved into
// the prose (debossed muted Badge), and it's a real link — focusable, and the
// preview opens on focus as well as hover.
function InlineCitation({
  className,
  href,
  title,
  favicon,
  index,
  children,
  ...props
}: Omit<React.ComponentProps<"a">, "title"> & {
  title?: React.ReactNode
  favicon?: string
  index?: number
}) {
  return (
    <PreviewCard>
      <PreviewCardTrigger
        data-slot="inline-citation"
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          badgeVariants({ variant: "muted" }),
          "mx-0.5 h-4 min-w-4 -translate-y-[0.35em] px-1 text-[0.65rem] align-super no-underline",
          className
        )}
        {...props}
      >
        {index ?? children}
      </PreviewCardTrigger>
      <PreviewCardContent className="w-72 p-3">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 outline-none"
        >
          <Avatar className="size-7 rounded-sm">
            {favicon ? <AvatarImage src={favicon} alt="" /> : null}
            <AvatarFallback className="rounded-sm text-[0.65rem]">
              {index ?? "•"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{title}</div>
            <div className="text-muted-foreground truncate text-xs">{href}</div>
          </div>
        </a>
      </PreviewCardContent>
    </PreviewCard>
  )
}

export {
  Sources,
  SourcesTrigger,
  SourcesContent,
  Source,
  InlineCitation,
}
