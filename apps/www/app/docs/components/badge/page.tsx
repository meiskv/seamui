import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import BadgeDemo from "@/registry/seam/examples/badge-demo"

export const metadata: Metadata = {
  title: "Badge — seamui",
  description: "Miniature embossed status chip with seam depth variants.",
}

export default function BadgeDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Badge</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A miniature key for status and counts. Filled variants are embossed
        chips resting on the surface; <code>muted</code> is debossed — carved in
        for quiet, passive status.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <BadgeDemo />,
            code: exampleSource("badge-demo"),
          },
        ]}
      />

      <Install name="badge" />

      <Notes>
        <li>
          Not pressable, so it carries no press feedback — for a tappable chip,
          use a small <code>Button</code> or <code>Toggle</code> instead.
        </li>
        <li>
          Renders a <code>&lt;span&gt;</code>; when a badge conveys meaning
          through color alone, include the meaning in the text (e.g.
          &ldquo;Error&rdquo;) rather than relying on the variant.
        </li>
      </Notes>
    </main>
  )
}
