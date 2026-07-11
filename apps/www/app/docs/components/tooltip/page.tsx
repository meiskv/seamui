import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import TooltipDemo from "@/registry/seam/examples/tooltip-demo"
import TooltipIcon from "@/registry/seam/examples/tooltip-icon"
import TooltipShortcut from "@/registry/seam/examples/tooltip-shortcut"

export const metadata: Metadata = {
  title: "Tooltip — seamui",
  description: "Tooltip built on Base UI; the surface rises with overlay depth.",
}

export default function TooltipDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Tooltip</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A popup that shows on hover or focus. It rises toward you with overlay
        depth — the canonical seam pattern for floating surfaces.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <TooltipDemo />, code: exampleSource("tooltip-demo") },
          { key: "icon", title: "Icon button", component: <TooltipIcon />, code: exampleSource("tooltip-icon"), description: "The most common case — a label for an icon-only control." },
          { key: "shortcut", title: "With shortcut", component: <TooltipShortcut />, code: exampleSource("tooltip-shortcut"), description: "Pair the hint with its keyboard shortcut via Kbd." },
        ]}
      />

      <Install name="tooltip" />

      <Notes>
        <li>
          Wrap your app (or a subtree) in <code>TooltipProvider</code> to share
          the open delay (200ms by default) and coordinate open state across
          tooltips.
        </li>
        <li>
          Shows on hover and keyboard focus; dismisses on blur and Escape.
        </li>
      </Notes>
    </main>
  )
}
