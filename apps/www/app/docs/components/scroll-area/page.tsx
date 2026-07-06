import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ScrollAreaDemo from "@/registry/seam/examples/scroll-area-demo"

export const metadata: Metadata = {
  title: "Scroll Area — seamui",
  description: "Custom scrollbar area built on Base UI.",
}

export default function ScrollAreaDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Scroll Area</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        A scrollable region with a slim custom scrollbar that fades in on hover
        and while scrolling.
      </p>

      <ComponentPreview code={exampleSource("scroll-area-demo")}>
        <ScrollAreaDemo />
      </ComponentPreview>

      <Install name="scroll-area" />

      <Section title="Usage">
        <CodeBlock>{`import { ScrollArea } from "@/components/ui/scroll-area"`}</CodeBlock>
        <CodeBlock>{`<ScrollArea className="h-40 w-64 rounded-md border p-4">
  {/* long content */}
</ScrollArea>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The scrollbar fades in on <code>data-[hovering]</code> and{" "}
          <code>data-[scrolling]</code> and fades back out after a short delay —
          calm by default, present when you need it.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Native scrolling is preserved (keyboard, wheel, touch); the custom
          scrollbar is a visual layer over it, not a replacement.
        </p>
      </Section>
    </main>
  )
}
