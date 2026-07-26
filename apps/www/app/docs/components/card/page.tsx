import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import CardDemo from "@/registry/seam/examples/card-demo"
import CardStats from "@/registry/seam/examples/card-stats"
import CardNotification from "@/registry/seam/examples/card-notification"
import CardVariants from "@/registry/seam/examples/card-variants"

export const metadata: Metadata = {
  title: "Card — seamui",
  description: "A raised surface key with header, content, and footer.",
}

export default function CardDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Card</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A generic raised surface — a white key resting on the canvas — with
        header, content, and footer sections.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Sign in",
            component: <CardDemo />,
            code: exampleSource("card-demo"),
          },
          {
            key: "stats",
            title: "Stat",
            component: <CardStats />,
            code: exampleSource("card-stats"),
          },
          {
            key: "notification",
            title: "Notification",
            component: <CardNotification />,
            code: exampleSource("card-notification"),
          },
          {
            key: "variants",
            title: "Variants",
            component: <CardVariants />,
            code: exampleSource("card-variants"),
            description:
              "Three surfaces: the default key, a folder whose stroked back panel signals it holds a set, and a debossed well.",
          },
        ]}
        stageClassName="min-h-[34rem]"
      />

      <Install name="card" />

      <Notes>
        <li>
          A static surface at <code>resting</code> depth — it never animates on
          its own; depth motion belongs to the interactive keys placed inside it
          and to overlays that rise above it.
        </li>
        <li>
          Renders plain <code>&lt;div&gt;</code> structure with no implicit
          semantics — use a heading element inside <code>CardTitle</code> when
          the card titles a page section.
        </li>
        <li>
          <code>variant="folder"</code> draws its back panel as a pseudo-element
          <em> above</em> the card's box, so an <code>overflow-hidden</code> on
          the card (common when clipping media) will clip the tab away — put the
          clipping on an inner wrapper instead.
        </li>
      </Notes>
    </main>
  )
}
