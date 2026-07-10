import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import TextareaDemo from "@/registry/seam/examples/textarea-demo"
import TextareaWithButton from "@/registry/seam/examples/textarea-with-button"
import TextareaDisabled from "@/registry/seam/examples/textarea-disabled"

export const metadata: Metadata = {
  title: "Textarea — seamui",
  description:
    "Auto-growing multiline text field styled as a seam entry well.",
}

export default function TextareaDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Textarea</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A multiline text field carved into the surface as a debossed entry
        well. Grows with its content via <code>field-sizing</code> — no
        auto-resize JavaScript.
      </p>

      <ComponentPreview code={exampleSource("textarea-demo")}>
        <TextareaDemo />
      </ComponentPreview>

      <Install name="textarea" />

      <Section title="Usage">
        <CodeBlock>{`import { Textarea } from "@/components/ui/textarea"`}</CodeBlock>
        <CodeBlock>{`<Textarea placeholder="Type your message here." />`}</CodeBlock>
      </Section>

      <Section title="Examples">
        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          With button
        </h3>
        <ComponentPreview code={exampleSource("textarea-with-button")}>
          <TextareaWithButton />
        </ComponentPreview>

        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Disabled
        </h3>
        <ComponentPreview code={exampleSource("textarea-disabled")}>
          <TextareaDisabled />
        </ComponentPreview>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Like Input, the textarea stays still by design — text entry is calm,
          and the focus ring provides feedback without motion. Growth is
          handled by native <code>field-sizing: content</code>, so the well
          expands with the text instead of scrolling.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Renders a native <code>&lt;textarea&gt;</code>. Base UI has no
          Textarea part; inside a Base UI <code>Field</code>, pass it through{" "}
          <code>&lt;Field.Control render=&#123;&lt;Textarea /&gt;&#125;
          /&gt;</code> to get label and validation wiring.
        </p>
      </Section>
    </main>
  )
}
