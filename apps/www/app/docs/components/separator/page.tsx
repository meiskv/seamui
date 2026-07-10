import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SeparatorDemo from "@/registry/seam/examples/separator-demo"
import SeparatorLabel from "@/registry/seam/examples/separator-label"

export const metadata: Metadata = {
  title: "Separator — seamui",
  description: "Accessible separator built on Base UI.",
}

export default function SeparatorDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Separator</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Visually or semantically separates content, in either orientation.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <SeparatorDemo />, code: exampleSource("separator-demo") },
          { key: "label", title: "With label", component: <SeparatorLabel />, code: exampleSource("separator-label") },
        ]}
      />

      <Install name="separator" />

      <Section title="Usage">
        <CodeBlock>{`import { Separator } from "@/components/ui/separator"`}</CodeBlock>
        <CodeBlock>{`<Separator />
<Separator orientation="vertical" />`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Static by design — a separator is structure, not interaction, so it
          carries no motion.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Exposed to screen readers with the correct role and orientation. Set{" "}
          <code>orientation=&quot;vertical&quot;</code> inside a flex row.
        </p>
      </Section>
    </main>
  )
}
