import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ScrollAreaDemo from "@/registry/seam/examples/scroll-area-demo"

export const metadata: Metadata = {
  title: "Scroll Area — seamui",
  description: "Custom scrollbar area built on Base UI.",
}

export default function ScrollAreaDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Scroll Area</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A scrollable region with a slim custom scrollbar that fades in on hover
        and while scrolling.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <ScrollAreaDemo />, code: exampleSource("scroll-area-demo") },
        ]}
      />

      <Install name="scroll-area" />

      <Notes>
        <li>
          The scrollbar fades in on <code>data-[hovering]</code> and{" "}
          <code>data-[scrolling]</code> and fades back out after a short delay.
        </li>
        <li>
          Native scrolling is preserved (keyboard, wheel, touch) — the custom
          scrollbar is a visual layer over it, not a replacement.
        </li>
      </Notes>
    </main>
  )
}
