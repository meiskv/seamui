import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ComboboxDemo from "@/registry/seam/examples/combobox-demo"

export const metadata: Metadata = {
  title: "Combobox — seamui",
  description:
    "A filterable input bound to a listbox popup, built on Base UI Combobox.",
}

export default function ComboboxDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Combobox</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        A debossed text field that filters a listbox of options as you type.
        Built on Base UI Combobox — it owns filtering, keyboard navigation, and
        selection; seamui adds the well/key depth and overlay motion.
      </p>

      <ComponentPreview code={exampleSource("combobox-demo")}>
        <ComboboxDemo />
      </ComponentPreview>

      <Install name="combobox" />

      <Section title="Usage">
        <CodeBlock>{`import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"`}</CodeBlock>
        <CodeBlock>{`const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "astro", label: "Astro" },
]

<Combobox items={frameworks} itemToStringLabel={(f) => f.label}>
  <ComboboxInput placeholder="Search framework…" />
  <ComboboxContent>
    <ComboboxEmpty>No framework found.</ComboboxEmpty>
    <ComboboxList>
      {(f) => (
        <ComboboxItem key={f.value} value={f}>{f.label}</ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          Pass the option objects to <code>items</code> and a{" "}
          <code>itemToStringLabel</code> so Base UI can filter and echo the
          selected label into the input. Add <code>multiple</code> on the root
          to select several values (compose <code>Combobox.Chips</code> for the
          token UI). Control with <code>value</code> /{" "}
          <code>onValueChange</code>.
        </p>
      </Section>

      <Section title="Anatomy">
        <p className="text-muted-foreground text-sm">
          <code>ComboboxInput</code> is the debossed entry field — it carries a
          leading search icon, a trailing chevron, and a Clear (
          <code>×</code>) button. <code>ComboboxContent</code> is the
          overlay-depth popup; <code>ComboboxList</code> takes a render function
          that maps the filtered items to <code>ComboboxItem</code>s.{" "}
          <code>ComboboxEmpty</code> renders only when nothing matches.
        </p>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The popup rises with <code>depth.overlay</code> on{" "}
          <code>springs.surface</code>; highlighted items shift with{" "}
          <code>data-[highlighted]</code>. Under{" "}
          <code>prefers-reduced-motion</code> the popup fades in with{" "}
          <code>fades.normal</code> instead of rising.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Base UI wires the <code>combobox</code> / <code>listbox</code> roles,
          <code>aria-activedescendant</code>, and full keyboard support (type to
          filter, arrows to move, Enter to select, Escape to close). The Clear
          button is labelled; the empty state announces politely.
        </p>
      </Section>
    </main>
  )
}
