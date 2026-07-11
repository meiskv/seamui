import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SuggestionsDemo from "@/registry/seam/examples/suggestions-demo"
import SuggestionsWithComposer from "@/registry/seam/examples/suggestions-with-composer"

export const metadata: Metadata = {
  title: "Suggestions — seamui",
  description: "Scrollable row of prompt chips with a staggered entrance.",
}

export default function SuggestionsDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Suggestions</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A horizontally scrollable row of prompt chips for an empty state. Each
        chip is a small embossed key — it&apos;s pressable, so it <em>is</em> a
        Button, never a hand-rolled chip.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <SuggestionsDemo />, code: exampleSource("suggestions-demo") },
          { key: "with-composer", title: "Filling a composer", component: <SuggestionsWithComposer />, code: exampleSource("suggestions-with-composer") },
        ]}
      />

      <Install name="suggestions" />

      <Notes>
        <li>
          Pass <code>index</code> to opt into a staggered entrance — each chip
          rises on <code>springs.snappy</code> a beat after the last. Under
          reduced motion the stagger drops and each chip simply fades in.
        </li>
        <li>
          Chips are native Buttons — focusable and activatable — with press
          feedback inherited from Button; the row is reachable in tab order and
          arrow-scrollable.
        </li>
        <li>
          The scrollbar is hidden visually but the row still scrolls; there is
          deliberately no edge-fade mask, so focus rings on the first and last
          chips are never clipped.
        </li>
      </Notes>
    </main>
  )
}
