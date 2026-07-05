import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SwitchDemo from "@/registry/seam/examples/switch-demo"

export const metadata: Metadata = {
  title: "Switch — seamui",
  description: "Switch built on Base UI; the thumb springs between states.",
}

export default function SwitchDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Switch</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        A control that toggles between on and off. The thumb springs across the
        track with real physics.
      </p>

      <ComponentPreview code={exampleSource("switch-demo")}>
        <SwitchDemo />
      </ComponentPreview>

      <Install name="switch" />

      <Section title="Usage">
        <CodeBlock>{`import { Switch } from "@/components/ui/switch"`}</CodeBlock>
        <CodeBlock>{`<Switch defaultChecked onCheckedChange={setEnabled} />`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The thumb is a <code>layout</code> element: toggling flips the
          track&apos;s flex alignment, and motion springs the thumb to its new
          position with <code>springs.snappy</code> — interruptible mid-flight.
          Honors <code>prefers-reduced-motion</code>.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Renders a native switch with <code>role="switch"</code> and{" "}
          <code>aria-checked</code>. Controlled via <code>checked</code> /
          <code>onCheckedChange</code>, or uncontrolled via{" "}
          <code>defaultChecked</code>.
        </p>
      </Section>
    </main>
  )
}
