import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import RadioGroupDemo from "@/registry/seam/examples/radio-group-demo"

export const metadata: Metadata = {
  title: "Radio Group — seamui",
  description: "Radio group built on Base UI; the dot pops in with a spring.",
}

export default function RadioGroupDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Radio Group</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        A set of options where only one can be selected. The selected dot pops
        in with a spring.
      </p>

      <ComponentPreview code={exampleSource("radio-group-demo")}>
        <RadioGroupDemo />
      </ComponentPreview>

      <Install name="radio-group" />

      <Section title="Usage">
        <CodeBlock>{`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`}</CodeBlock>
        <CodeBlock>{`<RadioGroup defaultValue="a">
  <RadioGroupItem value="a" />
  <RadioGroupItem value="b" />
</RadioGroup>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Selecting an item mounts its indicator and scales the dot in from 0
          with <code>springs.snappy</code>. Honors{" "}
          <code>prefers-reduced-motion</code>.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Renders with <code>role="radiogroup"</code>; arrow keys move between
          items. Controlled via <code>value</code> / <code>onValueChange</code>,
          or uncontrolled via <code>defaultValue</code>.
        </p>
      </Section>
    </main>
  )
}
