import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import BadgeDemo from "@/registry/seam/examples/badge-demo"

export const metadata: Metadata = {
  title: "Badge — seamui",
  description: "Miniature embossed status chip with seam depth variants.",
}

export default function BadgeDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Badge</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A miniature key for status and counts. Filled variants are embossed
        chips resting on the surface; <code>muted</code> is debossed — carved
        in for quiet, passive status.
      </p>

      <ComponentPreview code={exampleSource("badge-demo")}>
        <BadgeDemo />
      </ComponentPreview>

      <Install name="badge" />

      <Section title="Usage">
        <CodeBlock>{`import { Badge } from "@/components/ui/badge"`}</CodeBlock>
        <CodeBlock>{`<Badge variant="secondary">Verified</Badge>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Static by design. Badges are not pressable, so they carry no press
          feedback — if you need a tappable chip, use a small{" "}
          <code>Button</code> or <code>Toggle</code> instead.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Renders a <code>&lt;span&gt;</code>. The label is the accessible
          text; when a badge conveys meaning through color alone, include the
          meaning in the text (e.g. &ldquo;Error&rdquo;) rather than relying on
          the variant.
        </p>
      </Section>
    </main>
  )
}
