import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ToolbarDemo from "@/registry/seam/examples/toolbar-demo"
import ToolbarInputExample from "@/registry/seam/examples/toolbar-input"
import ToolbarVertical from "@/registry/seam/examples/toolbar-vertical"

export const metadata: Metadata = {
  title: "Toolbar — seamui",
  description:
    "A raised strip of controls with one tab stop and arrow-key navigation, built on Base UI.",
}

export default function ToolbarDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Toolbar</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A raised strip of controls — buttons, toggle groups, links, entry wells
        — with a single tab stop; arrow keys rove between items.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <ToolbarDemo />,
            code: exampleSource("toolbar-demo"),
            description:
              "Tab once into the strip, then arrow between the toggles and buttons.",
          },
          {
            key: "input",
            title: "With input",
            component: <ToolbarInputExample />,
            code: exampleSource("toolbar-input"),
          },
          {
            key: "vertical",
            title: "Vertical",
            component: <ToolbarVertical />,
            code: exampleSource("toolbar-vertical"),
          },
        ]}
      />

      <Install name="toolbar" />

      <ApiTable
        rows={[
          {
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            desc: "Layout and arrow-key axis; the separator flips automatically.",
          },
          {
            prop: "loopFocus",
            type: "boolean",
            default: "true",
            desc: "Arrow navigation wraps at the ends.",
          },
          {
            prop: "variant / size",
            type: "buttonVariants props",
            default: '"ghost" / "sm"',
            desc: "On ToolbarButton — it wears the seam Button's cva.",
          },
        ]}
        footer={
          <>
            Parts: <code>Toolbar</code>, <code>ToolbarButton</code>,{" "}
            <code>ToolbarLink</code>, <code>ToolbarGroup</code>,{" "}
            <code>ToolbarSeparator</code>, <code>ToolbarInput</code>. Embed a
            seam <code>ToggleGroup</code> directly — it joins the roving focus.
          </>
        }
      />

      <Notes>
        <li>
          Base UI manages the roving focus through each item&apos;s ref, so
          ToolbarButton attaches press motion via the render prop (§5A Pattern
          A) instead of wrapping in the Button component — the wrapper would
          swallow the ref and kill arrow-key navigation.
        </li>
        <li>
          The strip is a raised surface (<code>shadow-resting</code>);
          ToolbarInput is an entry well carved into it, and an embedded
          ToggleGroup keeps its own debossed well — keys on a key, wells in a
          key, per §1.
        </li>
        <li>
          ToolbarButton presses with seam depth and taps the haptic on
          pointerdown; ToolbarLink stays a real link with no press depth, like
          pagination.
        </li>
      </Notes>
    </main>
  )
}
