import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
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

      <ComponentPreview code={exampleSource("suggestions-demo")}>
        <SuggestionsDemo />
      </ComponentPreview>

      <Install name="suggestions" />

      <Section title="Usage">
        <CodeBlock>{`import { Suggestions, Suggestion } from "@/components/ui/suggestions"`}</CodeBlock>
        <CodeBlock>{`<Suggestions>
  {prompts.map((p, i) => (
    <Suggestion key={p} index={i} onClick={() => setInput(p)}>
      {p}
    </Suggestion>
  ))}
</Suggestions>`}</CodeBlock>
      </Section>

      <Section title="Examples">
        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Filling a composer
        </h3>
        <ComponentPreview code={exampleSource("suggestions-with-composer")}>
          <SuggestionsWithComposer />
        </ComponentPreview>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Pass <code>index</code> to opt into a staggered entrance — each chip
          rises on <code>springs.snappy</code> a beat after the last. Press
          feedback is inherited from Button. Under reduced motion the stagger
          drops and each chip simply fades in.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Chips are native buttons — focusable and activatable — and the row is
          reachable in tab order and arrow-scrollable. The scrollbar is hidden
          visually but the row still scrolls; there is deliberately no edge-fade
          mask, so focus rings on the first and last chips are never clipped.
        </p>
      </Section>
    </main>
  )
}
