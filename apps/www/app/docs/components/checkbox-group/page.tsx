import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import CheckboxGroupDemo from "@/registry/seam/examples/checkbox-group-demo"
import CheckboxGroupParent from "@/registry/seam/examples/checkbox-group-parent"
import CheckboxGroupDisabled from "@/registry/seam/examples/checkbox-group-disabled"

export const metadata: Metadata = {
  title: "Checkbox Group — seamui",
  description:
    "Shared state for a set of checkboxes, with select-all parent support, built on Base UI.",
}

export default function CheckboxGroupDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Checkbox Group</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Shared state for a series of checkboxes — one <code>value</code> array
        in, one out — including a select-all parent with an indeterminate middle
        state.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <CheckboxGroupDemo />,
            code: exampleSource("checkbox-group-demo"),
          },
          {
            key: "parent",
            title: "Select all",
            component: <CheckboxGroupParent />,
            code: exampleSource("checkbox-group-parent"),
            description:
              "A parent Checkbox ticks, unticks, or shows indeterminate as its children change.",
          },
          {
            key: "disabled",
            title: "Disabled",
            component: <CheckboxGroupDisabled />,
            code: exampleSource("checkbox-group-disabled"),
          },
        ]}
      />

      <Install name="checkbox-group" />

      <ApiTable
        rows={[
          {
            prop: "value / defaultValue",
            type: "string[]",
            desc: "Names of the ticked checkboxes (controlled / uncontrolled).",
          },
          {
            prop: "onValueChange",
            type: "(value, eventDetails) => void",
            desc: "Fires with the new name array when any member toggles.",
          },
          {
            prop: "allValues",
            type: "string[]",
            desc: "Every member name — required to wire a select-all parent.",
          },
          {
            prop: "disabled",
            type: "boolean",
            desc: "Disables the whole group.",
          },
        ]}
        footer={
          <>
            Members are plain seam <code>Checkbox</code>es: give each a{" "}
            <code>name</code>, and mark the select-all one with{" "}
            <code>parent</code>.
          </>
        }
      />

      <Notes>
        <li>
          Motion and haptics live on the member checkboxes — each mark pops with
          a spring and ticks on commit — so the group wrapper adds no feedback
          of its own (no double-buzz).
        </li>
        <li>
          Inside a <code>Field</code>, wrap each row in <code>FieldItem</code>{" "}
          for per-option label wiring; standalone, the <code>Label</code>{" "}
          wrapper shown in the examples is enough.
        </li>
        <li>
          The parent checkbox&apos;s indeterminate state is managed by Base UI
          from <code>allValues</code> vs the current <code>value</code>.
        </li>
      </Notes>
    </main>
  )
}
