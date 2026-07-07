import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import InputDemo from "@/registry/seam/examples/input-demo"

export const metadata: Metadata = {
  title: "Input — seamui",
  description: "Text input built on Base UI, Field-aware.",
}

export default function InputDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Input</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A text input built on Base UI. Works automatically with Base UI Field
        for labels, validation, and messages.
      </p>

      <ComponentPreview code={exampleSource("input-demo")}>
        <InputDemo />
      </ComponentPreview>

      <Install name="input" />

      <Section title="Usage">
        <CodeBlock>{`import { Input } from "@/components/ui/input"`}</CodeBlock>
        <CodeBlock>{`<Input type="email" placeholder="Email" />`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Inputs stay still by design — the focus ring provides feedback without
          motion. This keeps text entry calm; depth animation is reserved for
          pressable and floating surfaces.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Renders a native <code>&lt;input&gt;</code>. Pair with Base UI{" "}
          <code>Field</code> for accessible labels and error messages; invalid
          state is exposed via <code>data-[invalid]</code>.
        </p>
      </Section>
    </main>
  )
}
