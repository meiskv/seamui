import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ToggleDemo from "@/registry/seam/examples/toggle-demo"

export const metadata: Metadata = {
  title: "Toggle — seamui",
  description: "Two-state button built on Base UI with seam press-depth motion.",
}

export default function ToggleDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Toggle</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        A two-state button that can be on or off. Presses recede into the
        surface with seam depth motion.
      </p>

      <ComponentPreview code={exampleSource("toggle-demo")}>
        <ToggleDemo />
      </ComponentPreview>

      <Install name="toggle" />

      <Section title="Usage">
        <CodeBlock>{`import { Toggle } from "@/components/ui/toggle"`}</CodeBlock>
        <CodeBlock>{`<Toggle aria-label="Toggle bold" defaultPressed>
  <Bold />
</Toggle>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Press recedes to <code>depth.pressed</code> with{" "}
          <code>springs.press</code>; the on-state is styled via Base UI&apos;s{" "}
          <code>data-[pressed]</code> attribute. Honors{" "}
          <code>prefers-reduced-motion</code>.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Renders a native <code>&lt;button&gt;</code> with{" "}
          <code>aria-pressed</code>. Controlled via <code>pressed</code> /
          <code>onPressedChange</code>, or uncontrolled via{" "}
          <code>defaultPressed</code>.
        </p>
      </Section>
    </main>
  )
}
