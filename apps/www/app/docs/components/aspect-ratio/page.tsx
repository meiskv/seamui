import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import AspectRatioDemo from "@/registry/seam/examples/aspect-ratio-demo"

export const metadata: Metadata = {
  title: "Aspect Ratio — seamui",
  description: "Constrains content to a fixed width-to-height ratio.",
}

export default function AspectRatioDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Aspect Ratio</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Locks its content to a given width-to-height ratio — handy for images,
        video, and embeds that must not jump as they load.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "16 / 9",
            component: <AspectRatioDemo />,
            code: exampleSource("aspect-ratio-demo"),
          },
        ]}
      />

      <Install name="aspect-ratio" />

      <Notes>
        <li>
          Uses the native CSS <code>aspect-ratio</code> property; pass{" "}
          <code>ratio</code> as a number (e.g. <code>16 / 9</code>).
        </li>
      </Notes>
    </main>
  )
}
