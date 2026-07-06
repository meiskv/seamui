import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ProgressDemo from "@/registry/seam/examples/progress-demo"

export const metadata: Metadata = {
  title: "Progress — seamui",
  description: "Progress bar built on Base UI with an eased fill.",
}

export default function ProgressDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Progress</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        Shows the completion of a task. The fill eases smoothly as the value
        changes.
      </p>

      <ComponentPreview code={exampleSource("progress-demo")}>
        <ProgressDemo />
      </ComponentPreview>

      <Install name="progress" />

      <Section title="Usage">
        <CodeBlock>{`import { Progress } from "@/components/ui/progress"`}</CodeBlock>
        <CodeBlock>{`<Progress value={66} />`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The indicator width eases with a duration (a layout dimension, like the
          accordion height) so the fill glides between values rather than
          jumping.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Exposes <code>role="progressbar"</code> with{" "}
          <code>aria-valuenow/min/max</code>. Set <code>value=&#123;null&#125;</code>{" "}
          for an indeterminate state.
        </p>
      </Section>
    </main>
  )
}
