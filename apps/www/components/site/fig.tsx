import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

/**
 * A numbered specimen panel for the home page — seam's take on the
 * engineering-figure idea: a live component on drafting-dot paper, a terse
 * caption, and the one line of API that powers it. The panel is a raised
 * key on the canvas; the caption strip is carved in below it.
 */
export function Fig({
  n,
  label,
  desc,
  prop,
  href,
  className,
  children,
}: {
  n: string
  label: string
  desc: string
  /** The mono API line in the footer, e.g. `whileTap = depth.pressed`. */
  prop: string
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "squircle bg-card flex flex-col overflow-hidden rounded-xl border shadow-resting",
        className
      )}
    >
      {/* the specimen, on drafting dots */}
      <div className="relative flex min-h-52 flex-1 items-center justify-center p-6">
        <div
          aria-hidden
          className="text-border/60 absolute inset-0 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px]"
        />
        <span
          aria-hidden
          className="text-muted-foreground/60 absolute top-3 right-3.5 font-mono text-[0.625rem] tracking-widest"
        >
          FIG.{n}
        </span>
        <div className="relative">{children}</div>
      </div>

      {/* caption strip */}
      <div className="border-t px-4 py-3">
        <p className="font-mono text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">
          <span aria-hidden className="text-primary">
            ›{" "}
          </span>
          {label}
        </p>
        <p className="text-muted-foreground mt-1 text-sm">{desc}</p>
      </div>

      {/* API line + docs link */}
      <div className="bg-muted/50 flex items-center justify-between gap-3 border-t px-4 py-2">
        <code className="text-muted-foreground truncate font-mono text-xs">
          {prop}
        </code>
        <Link
          href={href}
          className="text-muted-foreground hover:text-foreground shrink-0 text-xs underline-offset-4 hover:underline"
        >
          Docs →
        </Link>
      </div>
    </div>
  )
}
