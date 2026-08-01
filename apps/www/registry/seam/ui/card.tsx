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
         * The same key, hinting at a folder: a hairline tab aligned to the
         * content column.
         *
         * Stroke only — no fill, no shadow — so it reads as the layer *behind*
         * rather than a second key (§2: depth comes from shadow, and the back
         * of a stack catches none). It's drawn as a pseudo-element sitting
         * flush above the top border, so the silhouette stays one continuous
         * outline and `corner-shape` still applies. Note it renders outside the
         * card's box: an `overflow-hidden` on the card will clip it away.
         */
        tabbed: [
          "relative bg-card text-card-foreground border-border/60 shadow-resting",
          "before:absolute before:-top-2.5 before:left-5 before:h-2.5 before:w-2/5",
          "before:rounded-t-lg before:squircle",
          "before:border before:border-b-0 before:border-border/60",
          "before:content-['']",
        ],
        /**
         * A full folder silhouette: a filled tab rising off the card's top
         * left, joined down to the body by an angled shoulder.
         *
         * `::before` is the tab, `::after` the shoulder curving down to the
         * card's top edge, and `rounded-tl-none` squares the card's own
         * corner so the tab's left edge continues into it.
         *
         * Everything here is 18px — tab height, corner radius, shoulder — so
         * the silhouette has one radius throughout. The outline survives the
         * curve because the shoulder's gradient paints its own hairline; a
         * `clip-path` cut can't, which is why the shoulder isn't a triangle.
         *
         * Like `tabbed`, the tab renders outside the card's box —
         * `overflow-hidden` clips it, and it overlaps whatever sits directly
         * above.
         */
        folder: [
          "relative rounded-tl-none border-border/60 bg-card text-card-foreground shadow-resting",
          // Tab. 18px tall so the 18px corner renders un-clamped and matches
          // the card's other corners — a shorter tab makes the browser scale
          // the radius down and the top left reads tighter than the rest.
          "before:absolute before:-top-[18px] before:left-0 before:h-[18px] before:w-24",
          "before:rounded-tl-[18px] before:squircle before:bg-card before:content-['']",
          // Its own top and left hairline, continuing the card's outline. The
          // tab paints ABOVE the card (no negative z), so its fill hides the
          // card's own top border where it runs beneath — that segment isn't
          // part of the folder's silhouette.
          "before:border-t before:border-l before:border-border/60",
          // Depth, cast up and out only. A full resting shadow would fall
          // *onto* the card body, since a pseudo-element paints over its
          // element's background.
          "before:[box-shadow:0_-1px_3px_oklch(0.23_0.004_286/0.06)]",
          "dark:before:[box-shadow:0_-1px_3px_rgb(0_0_0/0.4)]",
          // Shoulder: one radial-gradient doing three jobs — transparent
          // inside the arc, a 1px hairline along it, fill beyond. That keeps
          // the outline unbroken round the curve, which a clip-path cut can't
          // do (it has no border to speak of), and gives the join the same
          // 18px radius as the corners instead of a sharp vertex.
          "after:absolute after:-top-[18px] after:left-24 after:size-[18px] after:content-['']",
          "after:bg-[radial-gradient(circle_at_100%_0%,transparent_17px,var(--border)_17px,var(--border)_18px,var(--card)_18px)]",
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
