import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import NumberFieldDemo from "@/registry/seam/examples/number-field-demo"

export const metadata: Metadata = {
  title: "Number Field — seamui",
  description: "Number input with press-depth steppers, built on Base UI.",
}

export default function NumberFieldDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Number Field</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A numeric input with increment and decrement steppers — and pointer
        scrubbing from Base UI. The steppers press with seam depth.
      </p>

      <ComponentPreview code={exampleSource("number-field-demo")}>
        <NumberFieldDemo />
      </ComponentPreview>

      <Install name="number-field" />

      <Section title="Usage">
        <CodeBlock>{`import { NumberField } from "@/components/ui/number-field"`}</CodeBlock>
        <CodeBlock>{`<NumberField defaultValue={1} min={0} max={10} />`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The +/- steppers reuse the Button press pattern: they recede to{" "}
          <code>depth.pressed</code> with <code>springs.press</code>. Honors{" "}
          <code>prefers-reduced-motion</code>.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Full keyboard support (arrows, Page Up/Down, Home/End) and a labelled
          spinbutton. Base UI also enables click-and-drag scrubbing on the input.
        </p>
      </Section>
    </main>
  )
}
