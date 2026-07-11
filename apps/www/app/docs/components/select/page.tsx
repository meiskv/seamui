import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
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

      <ApiTable
        rows={[
          { prop: "value / onValueChange", type: "Value, (value, eventDetails) => void", desc: "Controlled selection on <Select>." },
          { prop: "defaultValue", type: "Value", desc: "Initial selection when uncontrolled." },
          { prop: "variant", type: `"default" | "ghost"`, default: `"default"`, desc: "On <SelectTrigger> — recessed muted well, or naked text + chevron for inline dropdowns." },
          { prop: "sideOffset", type: "number", default: "6", desc: "On <SelectContent> — gap between trigger and popup." },
        ]}
        footer={
          <><code>&lt;Select&gt;</code> forwards all Base UI <code>Select.Root</code> props.</>
        }
      />

      <Notes>
        <li>
          <code>alignItemWithTrigger</code> is disabled, so the list drops{" "}
          <em>below</em> the trigger like a dropdown instead of Base UI&apos;s
          native-style overlay of the selected item on top of it.
        </li>
        <li>
          The popup condenses in/out via CSS keyed to Base UI&apos;s{" "}
          <code>data-starting-style</code> / <code>data-ending-style</code>, so
          the exit is awaited before unmount.
        </li>
        <li>
          The list matches the trigger&apos;s width via{" "}
          <code>--anchor-width</code> and caps its height to the available
          viewport space.
        </li>
      </Notes>
    </main>
  )
}
