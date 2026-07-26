import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A folder silhouette drawn behind whatever you put inside it — a tabbed back
 * panel that a Card (or anything else) sits in front of, like a sheet in a
 * physical folder.
 *
 * ── how the shape is made ────────────────────────────────────────────────
 * The notch is two solid rectangles — a short tab at the top left over a
 * full-width body — rather than one clipped element. `clip-path` can cut the
 * silhouette from a single box, but it also clips `box-shadow`, so anything
 * placed in the folder loses its depth. Two opaque shapes composite with no
 * seam, because there's no stroke to misalign.
 *
 * Flat by design: the shell is a backdrop, so it carries no shadow of its own
 * and lets the card in front of it be the raised key.
 *
 * ── colour ──────────────────────────────────────────────────────────────
 * The fill is a custom property, defaulting to the `--muted` well so a folder
 * reads as library furniture rather than decoration. Pass any colour to accent
 * one:
 *
 *   <FolderShell className="[--folder-fill:var(--color-violet-400)]">
 */
function FolderShell({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="folder-shell"
      className={cn(
        "relative isolate",
        // the accent slot — override this one property to colour a folder
        "[--folder-fill:var(--muted)]",
        className
      )}
      {...props}
    >
      {/* the tab — a short block at the left, rounded along its top edge */}
      <div
        aria-hidden
        data-slot="folder-shell-tab"
        className="absolute top-0 left-0 h-4 w-[44%] rounded-t-xl squircle bg-[var(--folder-fill)]"
      />
      {/* the body — overlaps the tab's foot so the two read as one shape */}
      <div
        aria-hidden
        data-slot="folder-shell-body"
        className="absolute inset-x-0 top-3 bottom-0 rounded-xl squircle bg-[var(--folder-fill)]"
      />

      {/* content sits in front, cleared of the tab */}
      <div
        data-slot="folder-shell-content"
        className="relative z-10 px-2 pt-7 pb-2"
      >
        {children}
      </div>
    </div>
  )
}

export { FolderShell }
