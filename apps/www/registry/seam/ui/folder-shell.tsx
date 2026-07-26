import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A folder silhouette drawn behind whatever you put inside it — a tabbed back
 * panel that a Card (or anything else) sits in front of, like a sheet in a
 * physical folder.
 *
 * ── how the shape is made ────────────────────────────────────────────────
 * The notch is two solid rectangles — a short tab over a full-width body —
 * rather than one clipped element. `clip-path` can cut the silhouette from a
 * single box, but it also **clips box-shadow**, which would flatten the folder
 * out of seamui's depth stack entirely. Two opaque shapes composite seamlessly
 * (there's no stroke to seam), and the wrapper's `drop-shadow` follows their
 * combined alpha, so the whole folder casts one correct shadow.
 *
 * ── colour ──────────────────────────────────────────────────────────────
 * The fill is a custom property, defaulting to the `--muted` well so a folder
 * reads as library furniture rather than decoration. Pass any colour to accent
 * one:
 *
 *   <FolderShell className="[--folder-fill:var(--color-violet-500)]">
 *
 * Stacked layers tint themselves off that one value with `color-mix`, so an
 * accent only ever has to be set once.
 */

/** Frontmost layer last — each earlier one peeks a step higher and dimmer. */
const LAYER_TOPS = ["top-0", "top-2", "top-4"] as const
/**
 * Back layers are the same fill at lower opacity, NOT a `color-mix` toward the
 * background: mixing an accent with the warm canvas in oklch drifts its hue
 * (violet came out pink), while opacity lightens against whatever is behind
 * without touching the hue.
 */
const LAYER_DIMS = ["opacity-55", "opacity-80", ""] as const
/** Clears the exposed folder top: tab height plus one step per extra layer. */
const CONTENT_PAD = ["pt-7", "pt-9", "pt-11"] as const

function FolderLayer({ top, dim }: { top: string; dim: string }) {
  return (
    <div aria-hidden className={cn("absolute inset-x-0 bottom-0", top, dim)}>
      {/* the tab — a short block at the left, rounded along its top edge */}
      <div className="absolute top-0 left-0 h-4 w-[44%] rounded-t-xl squircle bg-[var(--folder-fill)]" />
      {/* the body — overlaps the tab's foot so the two read as one shape */}
      <div className="absolute inset-x-0 top-3 bottom-0 rounded-xl squircle bg-[var(--folder-fill)]" />
    </div>
  )
}

function FolderShell({
  className,
  children,
  layers = 1,
  ...props
}: React.ComponentProps<"div"> & {
  /** 1 is a single folder; 2–3 stack offset tabs behind it. */
  layers?: 1 | 2 | 3
}) {
  const depth = Math.min(3, Math.max(1, Math.round(layers))) as 1 | 2 | 3
  // drawn back-to-front, so the frontmost layer is the full-strength fill
  const stack = LAYER_TOPS.slice(0, depth)

  return (
    <div
      data-slot="folder-shell"
      data-layers={depth}
      className={cn(
        "relative isolate",
        // the accent slot — override this one property to colour a folder
        "[--folder-fill:var(--muted)]",
        // depth for the silhouette, not the box: drop-shadow follows the
        // combined alpha of the layers, where box-shadow would trace a rect.
        "[--folder-shadow:oklch(0.23_0.004_286/0.10)] dark:[--folder-shadow:rgb(0_0_0/0.45)]",
        "[filter:drop-shadow(0_1px_2px_var(--folder-shadow))_drop-shadow(0_6px_14px_var(--folder-shadow))]",
        className
      )}
      {...props}
    >
      {stack.map((top, index) => (
        <FolderLayer
          key={top}
          top={top}
          // read from the end so the last drawn layer is always full strength
          dim={LAYER_DIMS[LAYER_DIMS.length - depth + index]}
        />
      ))}

      <div
        data-slot="folder-shell-content"
        className={cn("relative z-10 px-2 pb-2", CONTENT_PAD[depth - 1])}
      >
        {children}
      </div>
    </div>
  )
}

export { FolderShell }
