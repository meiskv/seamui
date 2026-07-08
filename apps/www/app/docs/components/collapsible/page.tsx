import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
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

      <ComponentPreview code={exampleSource("collapsible-demo")}>
        <CollapsibleDemo />
      </ComponentPreview>

      <Install name="collapsible" />

      <Section title="Usage">
        <CodeBlock>{`import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"`}</CodeBlock>
        <CodeBlock>{`<Collapsible>
  <CollapsibleTrigger render={<Button>Toggle</Button>} />
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Same height technique as Accordion:{" "}
          <code>--collapsible-panel-height</code> is measured by Base UI and the
          height is eased between 0 and that value.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          The trigger exposes <code>aria-expanded</code> and controls the
          region. Controlled via <code>open</code> / <code>onOpenChange</code>,
          or uncontrolled via <code>defaultOpen</code>.
        </p>
      </Section>
    </main>
  )
}
