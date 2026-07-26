import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A folder — tabbed back panel, a sheet peeking out of it, and a translucent
 * pocket carrying the label.
 *
 * ── how the shape is made ────────────────────────────────────────────────
 * Three solid blocks rather than one clipped element: a tab at the top left, a
 * full-width body beneath it, and — between them — a square whose
 * radial-gradient paints everything *except* a quarter disc. That carved
 * quarter is the concave curve where the tab meets the body; a straight
 * `clip-path` cut gives a hard corner there, and a border-radius can only bend
 * the other way. All three share one fill, so they read as a single silhouette
 * with no seam to misalign.
 *
 * ── colour ──────────────────────────────────────────────────────────────
 * Two custom properties, defaulting to the `--muted` well. Set them together
 * when accenting, so label contrast follows the fill:
 *
 *   <FolderShell className="[--folder-fill:var(--color-violet-500)]
 *                           [--folder-foreground:var(--color-white)]">
 *
 * The pocket and sheet are white at low alpha over that fill, so an accent
 * only ever has to be set in one place.
 */

function FolderShell({
  className,
  children,
  action,
  footer,
  ...props
}: React.ComponentProps<"div"> & {
  /** Sits at the top right of the pocket — a menu key, usually. */
  action?: React.ReactNode
  /** Quiet line along the foot of the pocket. */
  footer?: React.ReactNode
}) {
  return (
    <div
      data-slot="folder-shell"
      className={cn(
        // 3:2 — the folder keeps its proportion instead of collapsing to the
        // label. Override with `aspect-auto` to size from content.
        "relative isolate aspect-3/2",
        "[--folder-fill:var(--muted)] [--folder-foreground:var(--foreground)]",
        "text-[var(--folder-foreground)]",
        className
      )}
      {...props}
    >
      {/* tab — rounded along its top, square where the body meets it */}
      <div
        aria-hidden
        data-slot="folder-shell-tab"
        className="absolute top-0 left-0 h-6 w-[42%] rounded-t-2xl bg-[var(--folder-fill)]"
      />
      {/* the concave joint: fill everywhere except a carved quarter disc */}
      <div
        aria-hidden
        data-slot="folder-shell-notch"
        // spans tab-top to body-top exactly, so the curve starts flush with
        // the tab's top edge and lands flush on the body's — the circle is
        // centred top-RIGHT, carving the quarter away from the tab
        className="absolute top-0 left-[42%] size-5 bg-[radial-gradient(circle_at_100%_0%,transparent_var(--notch),var(--folder-fill)_var(--notch))] [--notch:20px]"
      />
      {/* body */}
      <div
        aria-hidden
        data-slot="folder-shell-body"
        className="absolute inset-x-0 top-5 bottom-0 rounded-2xl squircle bg-[var(--folder-fill)]"
      />

      {/* a sheet, showing only in the gap above the pocket — it must not run
          under the label, because the pocket is translucent and would wash
          the text out */}
      <div
        aria-hidden
        data-slot="folder-shell-sheet"
        className="absolute inset-x-4 top-7 h-6 rounded-t-lg bg-white/85 dark:bg-white/70"
      />

      {/* the pocket — white at low alpha, so one fill drives the whole folder */}
      <div
        data-slot="folder-shell-pocket"
        className="absolute inset-x-1.5 top-12 bottom-1.5 flex flex-col rounded-2xl squircle bg-white/20 px-4 pt-3.5 pb-3"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">{children}</div>
          {action ? (
            <span data-slot="folder-shell-action" className="shrink-0">
              {action}
            </span>
          ) : null}
        </div>
        {footer ? (
          <div
            data-slot="folder-shell-footer"
            className="mt-auto pt-3 text-xs opacity-70"
          >
            {footer}
          </div>
        ) : null}
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
      className={cn("truncate text-lg leading-tight font-semibold", className)}
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
      className={cn("mt-0.5 truncate text-sm opacity-80", className)}
      {...props}
    />
  )
}

export { FolderShell, FolderShellTitle, FolderShellDescription }
