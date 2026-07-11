import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import CollapsibleDemo from "@/registry/seam/examples/collapsible-demo"

export const metadata: Metadata = {
  title: "Collapsible — seamui",
  description: "Collapsible built on Base UI with eased height animation.",
}

export default function CollapsibleDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Collapsible</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A single expandable region — the primitive under Accordion, on its own.
        Height animates between 0 and its measured value.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <CollapsibleDemo />,
            code: exampleSource("collapsible-demo"),
          },
        ]}
      />

      <Install name="collapsible" />

      <Notes>
        <li>
          Same height technique as Accordion: Base UI measures{" "}
          <code>--collapsible-panel-height</code> and the height eases between 0
          and that value.
        </li>
        <li>
          The trigger exposes <code>aria-expanded</code> and controls the
          region; controlled via <code>open</code> / <code>onOpenChange</code>,
          or uncontrolled via <code>defaultOpen</code>.
        </li>
      </Notes>
    </main>
  )
}
