import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ToggleGroupDemo from "@/registry/seam/examples/toggle-group-demo"
import ToggleGroupText from "@/registry/seam/examples/toggle-group-text"
import ToggleGroupDisabled from "@/registry/seam/examples/toggle-group-disabled"

export const metadata: Metadata = {
  title: "Toggle Group — seamui",
  description:
    "A debossed well of toggles; the pressed one rises as an embossed key.",
}

export default function ToggleGroupDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Toggle Group</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A set of two-state buttons in a debossed well — the pressed one rises
        out of it as an embossed white key.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Alignment", component: <ToggleGroupDemo />, code: exampleSource("toggle-group-demo") },
          { key: "text", title: "Formatting", component: <ToggleGroupText />, code: exampleSource("toggle-group-text") },
          { key: "disabled", title: "Disabled", component: <ToggleGroupDisabled />, code: exampleSource("toggle-group-disabled") },
        ]}
      />

      <Install name="toggle-group" />

      <Section title="Usage">
        <CodeBlock>{`import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup } from "@/components/ui/toggle-group"`}</CodeBlock>
        <CodeBlock>{`<ToggleGroup defaultValue={["left"]}>
  <Toggle value="left" aria-label="Align left"><AlignLeft /></Toggle>
  <Toggle value="center" aria-label="Align center"><AlignCenter /></Toggle>
  <Toggle value="right" aria-label="Align right"><AlignRight /></Toggle>
</ToggleGroup>`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          Pass <code>toggleMultiple</code> to allow more than one pressed
          toggle at a time. Control with <code>value</code> /{" "}
          <code>onValueChange</code>.
        </p>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The well itself is static — depth comes from the{" "}
          <code>shadow-well</code> deboss and each Toggle&apos;s embossed
          pressed state (<code>bg-secondary</code> + <code>shadow-resting</code>
          ). Presses recede with <code>springs.press</code>; honors{" "}
          <code>prefers-reduced-motion</code> by dimming instead of moving.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Renders a <code>role=&quot;group&quot;</code> of native{" "}
          <code>&lt;button&gt;</code>s with <code>aria-pressed</code>, with
          arrow-key focus movement between toggles handled by Base UI.
        </p>
      </Section>
    </main>
  )
}
