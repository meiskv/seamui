import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ToggleDemo from "@/registry/seam/examples/toggle-demo"
import ToggleWithText from "@/registry/seam/examples/toggle-with-text"
import ToggleOutline from "@/registry/seam/examples/toggle-outline"
import ToggleSizes from "@/registry/seam/examples/toggle-sizes"
import ToggleDisabled from "@/registry/seam/examples/toggle-disabled"

export const metadata: Metadata = {
  title: "Toggle — seamui",
  description:
    "Two-state button built on Base UI with seam press-depth motion.",
}

export default function ToggleDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Toggle</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A two-state button that can be on or off. Presses recede into the
        surface with seam depth motion.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <ToggleDemo />,
            code: exampleSource("toggle-demo"),
          },
          {
            key: "with-text",
            title: "With text",
            component: <ToggleWithText />,
            code: exampleSource("toggle-with-text"),
          },
          {
            key: "outline",
            title: "Outline",
            component: <ToggleOutline />,
            code: exampleSource("toggle-outline"),
          },
          {
            key: "sizes",
            title: "Sizes",
            component: <ToggleSizes />,
            code: exampleSource("toggle-sizes"),
          },
          {
            key: "disabled",
            title: "Disabled",
            component: <ToggleDisabled />,
            code: exampleSource("toggle-disabled"),
          },
        ]}
      />

      <Install name="toggle" />

      <Notes>
        <li>
          Controlled via <code>pressed</code> / <code>onPressedChange</code>,
          uncontrolled via <code>defaultPressed</code>.
        </li>
        <li>
          Renders a native <code>&lt;button&gt;</code> with{" "}
          <code>aria-pressed</code>; the on-state is styled via Base UI&apos;s{" "}
          <code>data-[pressed]</code> attribute.
        </li>
      </Notes>
    </main>
  )
}
