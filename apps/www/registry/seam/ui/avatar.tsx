"use client"

import type * as React from "react"
import { Avatar as BaseAvatar } from "@base-ui/react/avatar"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { fades } from "@/lib/motion"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof BaseAvatar.Root>) {
  return (
    <BaseAvatar.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-9 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

const MotionImage = motion.create(BaseAvatar.Image)

function AvatarImage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MotionImage>) {
  return (
    <MotionImage
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      // seam motion: images resolve in with a gentle fade — no layout shift.
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={fades.normal}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof BaseAvatar.Fallback>) {
  return (
    <BaseAvatar.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
