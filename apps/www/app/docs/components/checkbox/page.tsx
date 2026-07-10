import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import CheckboxDemo from "@/registry/seam/examples/checkbox-demo"
import CheckboxWithText from "@/registry/seam/examples/checkbox-with-text"
import CheckboxIndeterminate from "@/registry/seam/examples/checkbox-indeterminate"
import CheckboxDisabled from "@/registry/seam/examples/checkbox-disabled"

export const metadata: Metadata = {
  title: "Checkbox — seamui",
  description: "Checkbox built on Base UI; the mark pops in with a spring.",
}

export default function CheckboxDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Checkbox</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A control that can be checked, unchecked, or indeterminate. The mark
        pops in with a spring.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <CheckboxDemo />, code: exampleSource("checkbox-demo") },
          { key: "with-text", title: "With text", component: <CheckboxWithText />, code: exampleSource("checkbox-with-text") },
          { key: "indeterminate", title: "Indeterminate", component: <CheckboxIndeterminate />, code: exampleSource("checkbox-indeterminate") },
          { key: "disabled", title: "Disabled", component: <CheckboxDisabled />, code: exampleSource("checkbox-disabled") },
        ]}
      />

      <Install name="checkbox" />

      <Section title="Usage">
        <CodeBlock>{`import { Checkbox } from "@/components/ui/checkbox"`}</CodeBlock>
        <CodeBlock>{`<Checkbox defaultChecked />
<Checkbox indeterminate />`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The indicator mounts on check and its mark scales in from 0 with{" "}
          <code>springs.snappy</code>. The indeterminate dash swaps in via a{" "}
          <code>data-[indeterminate]</code> CSS toggle. Honors{" "}
          <code>prefers-reduced-motion</code>.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Renders a native checkbox. Supports <code>checked</code>,{" "}
          <code>defaultChecked</code>, and <code>indeterminate</code>; pair with
          a <code>&lt;label&gt;</code> for a clickable target.
        </p>
      </Section>
    </main>
  )
}
