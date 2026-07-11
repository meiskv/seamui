import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SelectDemo from "@/registry/seam/examples/select-demo"
import SelectGroups from "@/registry/seam/examples/select-groups"
import SelectDisabled from "@/registry/seam/examples/select-disabled"

export const metadata: Metadata = {
  title: "Select — seamui",
  description: "Select built on Base UI with seam overlay-depth entrance.",
}

export default function SelectDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Select</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A control for choosing one value from a list. The listbox rises with
        overlay depth; the selected item shows a check.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <SelectDemo />, code: exampleSource("select-demo") },
          { key: "groups", title: "Groups", component: <SelectGroups />, code: exampleSource("select-groups") },
          { key: "disabled", title: "Disabled", component: <SelectDisabled />, code: exampleSource("select-disabled") },
        ]}
      />

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
          The popup grows from the trigger and fades in via the shared{" "}
          <code>condense</code> token from <code>@/lib/motion</code> — CSS keyed
          to Base UI&apos;s <code>data-starting-style</code> /{" "}
          <code>data-ending-style</code> so the exit is awaited, then drops below
          the trigger, scaling and fading down on close. Base UI aligns the list
          to the trigger width via <code>--anchor-width</code> and handles
          keyboard selection. Under <code>prefers-reduced-motion</code> it fades
          only.
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
