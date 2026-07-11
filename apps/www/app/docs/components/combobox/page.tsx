import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
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

      <ApiTable
        rows={[
          { prop: "items", type: "Value[]", desc: "On <Combobox> — the option objects Base UI filters as you type." },
          { prop: "itemToStringLabel", type: "(item) => string", desc: "On <Combobox> — how an item echoes into the input as text." },
          { prop: "multiple", type: "boolean", default: "false", desc: "On <Combobox> — select several values; compose ComboboxChips for the token UI." },
          { prop: "value / onValueChange", type: "Value | Value[], (value, eventDetails) => void", desc: "Controlled selection on <Combobox>." },
          { prop: "showClear", type: "boolean", default: "true", desc: "On <ComboboxInput> — hides the trailing × button when false." },
          { prop: "sideOffset", type: "number", default: "6", desc: "On <ComboboxContent> — gap between field and popup." },
        ]}
        footer={
          <><code>&lt;Combobox&gt;</code> is Base UI&apos;s <code>Combobox.Root</code> aliased directly, so its full generic prop surface passes through.</>
        }
      />

      <Notes>
        <li>
          <code>ComboboxList</code> takes a render function that maps the
          filtered items to <code>ComboboxItem</code>s;{" "}
          <code>ComboboxEmpty</code> stays mounted (for screen-reader
          announcements) and only shows content when nothing matches.
        </li>
        <li>
          In multi-select, <code>ComboboxChips</code> wraps the chips + input
          in Base UI&apos;s <code>InputGroup</code> so the popup anchors to —
          and matches the width of — the whole well, not the bare input.
        </li>
        <li>
          The popup condenses in/out via CSS keyed to Base UI&apos;s{" "}
          <code>data-starting-style</code> / <code>data-ending-style</code>, so
          the exit is awaited before unmount.
        </li>
      </Notes>
    </main>
  )
}
