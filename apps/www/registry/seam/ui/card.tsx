import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "flex flex-col gap-5 rounded-xl squircle border py-5",
  {
    variants: {
      variant: {
        // a raised key resting on the canvas — never flat, never pure white edges.
        default: "bg-card text-card-foreground border-border/60 shadow-resting",
        /**
         * The same key, with the back panel of a folder showing above it: a
         * hairline tab aligned to the content column.
         *
         * Stroke only — no fill, no shadow — so it reads as the layer *behind*
         * rather than a second key (§2: depth comes from shadow, and the back
         * of a stack catches none). It's drawn as a pseudo-element sitting
         * flush above the top border, so the silhouette stays one continuous
         * outline and `corner-shape` still applies. Note it renders outside the
         * card's box: an `overflow-hidden` on the card will clip it away.
         */
        folder: [
          "relative bg-card text-card-foreground border-border/60 shadow-resting",
          "before:absolute before:-top-2.5 before:left-5 before:h-2.5 before:w-2/5",
          "before:rounded-t-lg before:squircle",
          "before:border before:border-b-0 before:border-border/60",
          "before:content-['']",
        ],
        // the debossed counterpart — a container things sit *in*, not a
        // surface that sits *on* (§1: slot vs token).
        well: "bg-muted text-card-foreground border-border/60 shadow-well",
        // hairline only. For dense grids, where a dozen raised keys reads as
        // noise — the stroke still separates the surface from the canvas.
        flat: "bg-card text-card-foreground border-border/60 shadow-none",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-5 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-base leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-5", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center gap-2 px-5", className)}
      {...props}
    />
  )
}

export {
  Card,
  cardVariants,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
}
