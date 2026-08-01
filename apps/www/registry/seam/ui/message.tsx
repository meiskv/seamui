"use client"

import type * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  springs,
  fades,
  depth,
  reduced,
  useMounted,
  useReducedMotion,
} from "@/lib/motion"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

type Role = "user" | "assistant"

// The row. User and assistant sit on opposite sides of the same axis; the
// `group/message` scope lets content + actions react to the row's role and
// hover state. Enters by rising off the canvas on a spring; under reduced
// motion it fades in place — movement swapped for opacity, never removed.
function Message({
  className,
  from = "assistant",
  ...props
}: React.ComponentProps<typeof motion.div> & { from?: Role }) {
  const reduceMotion = useReducedMotion()
  const mounted = useMounted()

  return (
    <motion.div
      data-slot="message"
      data-role={from}
      // gate the moving entrance behind mount so SSR-rendered history doesn't
      // hydration-mismatch; messages added after mount still animate in.
      initial={
        mounted
          ? reduceMotion
            ? reduced.fadeIn.initial
            : depth.overlay.initial
          : false
      }
      animate={depth.overlay.animate}
      transition={reduceMotion ? fades.normal : springs.snappy}
      className={cn(
        "group/message flex w-full items-start gap-3 py-1.5",
        "data-[role=user]:flex-row-reverse",
        className
      )}
      {...props}
    />
  )
}

// The bubble/prose slot. The asymmetry is the design: the user's words are an
// embossed key they placed on the surface (bg-secondary + shadow-resting,
// right-aligned); the assistant's reply is flat prose — the surface itself
// speaking — so it carries no bubble and no shadow.
function MessageContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-content"
      className={cn(
        "min-w-0 text-sm leading-relaxed",
        // user → embossed key
        "group-data-[role=user]/message:max-w-[80%] group-data-[role=user]/message:rounded-2xl group-data-[role=user]/message:squircle group-data-[role=user]/message:bg-secondary group-data-[role=user]/message:px-4 group-data-[role=user]/message:py-2.5 group-data-[role=user]/message:text-secondary-foreground group-data-[role=user]/message:shadow-resting",
        // assistant → flat prose on the canvas
        "group-data-[role=assistant]/message:w-full group-data-[role=assistant]/message:pt-1",
        className
      )}
      {...props}
    />
  )
}

function initials(name?: string) {
  if (!name) return ""
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}

// Dogfoods Avatar: image with an initials fallback. Sits at the top of the row.
function MessageAvatar({
  src,
  name,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Avatar> & { src?: string; name?: string }) {
  return (
    <Avatar
      data-slot="message-avatar"
      className={cn("size-8 shrink-0", className)}
      {...props}
    >
      {src ? <AvatarImage src={src} alt={name ?? ""} /> : null}
      <AvatarFallback className="text-xs">
        {children ?? initials(name)}
      </AvatarFallback>
    </Avatar>
  )
}

// Hover/focus-revealed action row (copy, regenerate, …). Reveal is opacity
// only — the one animation seamui runs on a plain duration — so it survives
// reduced motion; it just appears instantly instead of fading.
function MessageActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-actions"
      className={cn(
        "flex items-center gap-0.5 opacity-0 transition-opacity duration-150 ease-out",
        "group-hover/message:opacity-100 group-focus-within/message:opacity-100 motion-reduce:transition-none",
        "group-data-[role=user]/message:justify-end",
        className
      )}
      {...props}
    />
  )
}

export { Message, MessageContent, MessageAvatar, MessageActions }
