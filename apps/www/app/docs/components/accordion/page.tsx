import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import AccordionDemo from "@/registry/seam/examples/accordion-demo"
import AccordionSingle from "@/registry/seam/examples/accordion-single"
import AccordionDisabled from "@/registry/seam/examples/accordion-disabled"

export const metadata: Metadata = {
  title: "Accordion — seamui",
  description: "Accordion built on Base UI with eased height animation.",
}

export default function AccordionDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Accordion</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Stacked sections that expand one panel at a time. Panels grow and shrink
        with a measured height animation.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <AccordionDemo />, code: exampleSource("accordion-demo") },
          { key: "single", title: "Single", component: <AccordionSingle />, code: exampleSource("accordion-single") },
          { key: "disabled", title: "Disabled item", component: <AccordionDisabled />, code: exampleSource("accordion-disabled") },
        ]}
      />

      <Install name="accordion" />

      <Notes>
        <li>
          Base UI measures each panel&apos;s natural height into{" "}
          <code>--accordion-panel-height</code>; seamui eases the height between
          0 and that value — the layout-dimension exception to springs. The
          chevron rotates in sync.
        </li>
        <li>
          Full header/button/region semantics with keyboard support; set{" "}
          <code>openMultiple</code> on the root to allow several panels open at
          once.
        </li>
      </Notes>
    </main>
  )
}
