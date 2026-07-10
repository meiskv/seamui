import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ProgressDemo from "@/registry/seam/examples/progress-demo"
import ProgressLabeled from "@/registry/seam/examples/progress-labeled"

export const metadata: Metadata = {
  title: "Progress — seamui",
  description: "Progress bar built on Base UI with an eased fill.",
}

export default function ProgressDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Progress</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Shows the completion of a task. The fill eases smoothly as the value
        changes.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Animated", component: <ProgressDemo />, code: exampleSource("progress-demo") },
          { key: "labeled", title: "Labeled", component: <ProgressLabeled />, code: exampleSource("progress-labeled") },
        ]}
      />

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
