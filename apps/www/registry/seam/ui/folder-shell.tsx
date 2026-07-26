import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A folder — a tabbed surface you write straight into, no card nested inside.
 *
 * ── how the shape is made ────────────────────────────────────────────────
 * Two solid blocks: an angled tab at the top left over a full-width body,
 * overlapping so they read as one silhouette (there is no stroke, so nothing
 * seams). Square corners — the folder is a rectangle, not a rounded key.
 *
 * The tab's slant is a `clip-path` on the tab alone — safe here because the
 * folder is flat: clipping would otherwise cut off a box-shadow, which is why
 * the whole shape can't be one clipped element if it ever gains depth.
 *
 * ── colour ──────────────────────────────────────────────────────────────
 * Two custom properties, defaulting to the `--muted` well. Set them together
 * when accenting, so label contrast follows the fill:
 *
 *   <FolderShell className="[--folder-fill:var(--color-violet-500)]
 *                           [--folder-foreground:var(--color-white)]">
 */

/** Tab: square along the left, slanting in from 70% of its width. */
const TAB_SLANT = "[clip-path:polygon(0_0,70%_0,100%_100%,0_100%)]"

function FolderShell({
  className,
  children,
  icon,
  ...props
}: React.ComponentProps<"div"> & {
  /** Optional leading glyph, rendered beside the text. */
  icon?: React.ReactNode
}) {
  return (
    <div
      data-slot="folder-shell"
      className={cn(
        "relative isolate",
        "[--folder-fill:var(--muted)] [--folder-foreground:var(--foreground)]",
        "text-[var(--folder-foreground)]",
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        data-slot="folder-shell-tab"
        className={cn(
          "absolute top-0 left-0 h-3.5 w-[46%] bg-[var(--folder-fill)]",
          TAB_SLANT
        )}
      />
      {/* the body overlaps the tab's foot, so the two read as one shape */}
      <div
        aria-hidden
        data-slot="folder-shell-body"
        className="absolute inset-x-0 top-2.5 bottom-0 bg-[var(--folder-fill)]"
      />

      <div
        data-slot="folder-shell-content"
        className="relative z-10 flex items-start gap-3 px-4 pt-6 pb-4"
      >
        {icon ? (
          <span
            data-slot="folder-shell-icon"
            className="mt-0.5 shrink-0 opacity-70 [&_svg]:size-5"
          >
            {icon}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  )
}

function FolderShellTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="folder-shell-title"
      className={cn("text-base leading-none font-semibold", className)}
      {...props}
    />
  )
}

function FolderShellDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // opacity rather than --muted-foreground, so it stays legible on an accent
  return (
    <div
      data-slot="folder-shell-description"
      className={cn("mt-1.5 text-sm opacity-70", className)}
      {...props}
    />
  )
}

export { FolderShell, FolderShellTitle, FolderShellDescription }
