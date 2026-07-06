import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SelectDemo from "@/registry/seam/examples/select-demo"

export const metadata: Metadata = {
  title: "Select — seamui",
  description: "Select built on Base UI with seam overlay-depth entrance.",
}

export default function SelectDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Select</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        A control for choosing one value from a list. The listbox rises with
        overlay depth; the selected item shows a check.
      </p>

      <ComponentPreview code={exampleSource("select-demo")}>
        <SelectDemo />
      </ComponentPreview>

      <Install name="select" />

      <Section title="Usage">
        <CodeBlock>{`import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"`}</CodeBlock>
        <CodeBlock>{`<Select defaultValue="a">
  <SelectTrigger>
    <SelectValue placeholder="Choose…" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The popup animates in with <code>depth.overlay</code> and{" "}
          <code>springs.surface</code>. Base UI aligns the list to the trigger
          width via <code>--anchor-width</code> and handles keyboard selection.
          Honors <code>prefers-reduced-motion</code>.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Native <code>role="listbox"</code> semantics, typeahead, and full
          keyboard control. Controlled via <code>value</code> /{" "}
          <code>onValueChange</code>, or uncontrolled via{" "}
          <code>defaultValue</code>.
        </p>
      </Section>
    </main>
  )
}
