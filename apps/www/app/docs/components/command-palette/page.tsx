import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import CommandPaletteDemo from "@/registry/seam/examples/command-palette-demo"
import CommandPaletteFlat from "@/registry/seam/examples/command-palette-flat"

export const metadata: Metadata = {
  title: "Command Palette — seamui",
  description:
    "⌘K launcher — Base UI Autocomplete rendered inline and always-open inside a Dialog.",
}

export default function CommandPaletteDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Command Palette</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The ⌘K surface: type to filter, arrows to move, Enter to run. Built on
        Base UI&apos;s Autocomplete rendered <code>inline</code> and always{" "}
        <code>open</code> inside a Dialog — the documented composition, so
        filtering, roving highlight, and screen-reader wiring all come from the
        primitive.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <CommandPaletteDemo />,
            code: exampleSource("command-palette-demo"),
          },
          {
            key: "flat",
            title: "Flat list",
            component: <CommandPaletteFlat />,
            code: exampleSource("command-palette-flat"),
          },
        ]}
      />

      <Install name="command-palette" />

      <Notes>
        <li>
          The panel is a modal key rising on <code>condense</code> from the top
          of the viewport; the search field is a debossed entry well; shortcut
          hints are embossed <code>Kbd</code> caps. Highlighted rows get the
          same accent treatment as combobox and menu items.
        </li>
        <li>
          <code>⌘/Ctrl+K</code> toggles by default (<code>hotkey</code> prop to
          opt out); the dialog owns mount/unmount, so the filter query,
          highlight, and input reset every time it closes.
        </li>
        <li>
          <code>autoHighlight</code> keeps the top match armed for Enter,
          cmdk-style; <code>items</code> drives Base UI&apos;s built-in
          filtering for flat lists and <code>{"{ value, items }"}</code> groups
          alike.
        </li>
        <li>
          Actions are plain <code>onClick</code>s on{" "}
          <code>CommandPaletteItem</code> — close the palette in the handler. No
          router or state-library coupling.
        </li>
      </Notes>
    </main>
  )
}
