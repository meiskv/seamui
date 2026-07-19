import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import LabelDemo from "@/registry/seam/examples/label-demo"
import LabelCheckbox from "@/registry/seam/examples/label-checkbox"

export const metadata: Metadata = {
  title: "Label — seamui",
  description: "Accessible label for form controls.",
}

export default function LabelDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Label</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        An accessible label for a control. Associate it with{" "}
        <code>htmlFor</code>, or nest the control inside so a click focuses it.
        Inside a Field, prefer <code>FieldLabel</code> — it auto-associates.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "With input",
            component: <LabelDemo />,
            code: exampleSource("label-demo"),
          },
          {
            key: "checkbox",
            title: "Wrapping a control",
            component: <LabelCheckbox />,
            code: exampleSource("label-checkbox"),
          },
        ]}
      />

      <Install name="label" />

      <Notes>
        <li>
          Renders a plain <code>&lt;label&gt;</code>, so it works in server
          components.
        </li>
        <li>
          Dims when it wraps a disabled control (<code>data-disabled</code>) or
          sits next to a disabled <code>peer</code>.
        </li>
      </Notes>
    </main>
  )
}
