import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ContextMenuDemo from "@/registry/seam/examples/context-menu-demo"
import ContextMenuLabelled from "@/registry/seam/examples/context-menu-labelled"
import ContextMenuDestructive from "@/registry/seam/examples/context-menu-destructive"

export const metadata: Metadata = {
  title: "Context Menu — seamui",
  description:
    "Right-click menu built on Base UI with seam overlay-depth entrance.",
}

export default function ContextMenuDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Context Menu</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A menu opened by right-click (or long-press), anchored to the pointer.
        Same overlay depth as the dropdown menu.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <ContextMenuDemo />,
            code: exampleSource("context-menu-demo"),
          },
          {
            key: "labelled",
            title: "Grouped",
            component: <ContextMenuLabelled />,
            code: exampleSource("context-menu-labelled"),
            description: "Label + separator group related actions.",
          },
          {
            key: "destructive",
            title: "Destructive",
            component: <ContextMenuDestructive />,
            code: exampleSource("context-menu-destructive"),
            description: "A destructive action set apart at the bottom.",
          },
        ]}
      />

      <Install name="context-menu" />

      <Notes>
        <li>
          Opens on <code>contextmenu</code> (right-click) and long-press,
          anchored to the cursor position rather than the trigger element.
        </li>
        <li>
          Full keyboard navigation once open; dismisses on Escape and outside
          interaction.
        </li>
      </Notes>
    </main>
  )
}
