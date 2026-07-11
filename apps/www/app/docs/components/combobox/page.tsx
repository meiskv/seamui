import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ComboboxDemo from "@/registry/seam/examples/combobox-demo"
import ComboboxMultiple from "@/registry/seam/examples/combobox-multiple"
import ComboboxClear from "@/registry/seam/examples/combobox-clear"
import ComboboxGroups from "@/registry/seam/examples/combobox-groups"
import ComboboxCustom from "@/registry/seam/examples/combobox-custom"
import ComboboxInvalid from "@/registry/seam/examples/combobox-invalid"
import ComboboxDisabled from "@/registry/seam/examples/combobox-disabled"

export const metadata: Metadata = {
  title: "Combobox — seamui",
  description:
    "A filterable input bound to a listbox popup, built on Base UI Combobox.",
}

export default function ComboboxDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Combobox</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A debossed text field that filters a listbox of options as you type.
        Built on Base UI Combobox — it owns filtering, keyboard navigation, and
        selection; seamui adds the well/key depth and overlay motion.
      </p>

      <VariantPreview
        variants={[
          { key: "basic", title: "Basic", component: <ComboboxDemo />, code: exampleSource("combobox-demo"), description: "A single-select filter — type to narrow, pick one option." },
          { key: "multiple", title: "Multiple", component: <ComboboxMultiple />, code: exampleSource("combobox-multiple"), description: "Set multiple and render selected values as chips in a ComboboxChips well." },
          { key: "clear", title: "Clear", component: <ComboboxClear />, code: exampleSource("combobox-clear"), description: "With a value selected, the trailing × resets the field." },
          { key: "groups", title: "Groups", component: <ComboboxGroups />, code: exampleSource("combobox-groups"), description: "Grouped items with labels, filtered across groups via ComboboxCollection." },
          { key: "custom", title: "Custom items", component: <ComboboxCustom />, code: exampleSource("combobox-custom"), description: "Items can render arbitrary content — here an avatar, name, and role." },
          { key: "invalid", title: "Invalid", component: <ComboboxInvalid />, code: exampleSource("combobox-invalid"), description: "aria-invalid on the input paints the destructive border and ring." },
          { key: "disabled", title: "Disabled", component: <ComboboxDisabled />, code: exampleSource("combobox-disabled"), description: "Pass disabled on the root to freeze the whole control." },
        ]}
      />

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
          The popup grows from its trigger origin and fades in via the shared{" "}
          <code>condense</code> token from <code>@/lib/motion</code> — CSS keyed
          to Base UI&apos;s <code>data-starting-style</code> /{" "}
          <code>data-ending-style</code> so the exit is awaited, then falls back
          and fades on dismiss; highlighted items shift with{" "}
          <code>data-[highlighted]</code>. Under{" "}
          <code>prefers-reduced-motion</code> the scale is dropped and the popup
          fades only.
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
