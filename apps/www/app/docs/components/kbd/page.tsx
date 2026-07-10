import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import KbdDemo from "@/registry/seam/examples/kbd-demo"

export const metadata: Metadata = {
  title: "Kbd — seamui",
  description: "Keyboard shortcut rendered as a tiny embossed keycap.",
}

export default function KbdDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Kbd</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A keyboard key rendered literally in the seam language: a tiny
        embossed keycap resting on the surface.
      </p>

      <ComponentPreview code={exampleSource("kbd-demo")}>
        <KbdDemo />
      </ComponentPreview>

      <Install name="kbd" />

      <Section title="Usage">
        <CodeBlock>{`import { Kbd, KbdGroup } from "@/components/ui/kbd"`}</CodeBlock>
        <CodeBlock>{`<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Static by design — a Kbd depicts a key, it isn&apos;t one. It carries
          no press feedback and is not focusable or clickable.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Renders a native <code>&lt;kbd&gt;</code> element, which screen
          readers announce as keyboard input. Prefer full key names
          (&ldquo;Shift&rdquo;) or an <code>aria-label</code> when a symbol
          alone (⇧) could be ambiguous.
        </p>
      </Section>
    </main>
  )
}
