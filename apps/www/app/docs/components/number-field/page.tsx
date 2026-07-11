import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import NumberFieldDemo from "@/registry/seam/examples/number-field-demo"
import NumberFieldFormat from "@/registry/seam/examples/number-field-format"
import NumberFieldDisabled from "@/registry/seam/examples/number-field-disabled"

export const metadata: Metadata = {
  title: "Number Field — seamui",
  description: "Number input with press-depth steppers, built on Base UI.",
}

export default function NumberFieldDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Number Field</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A numeric input with increment and decrement steppers — and pointer
        scrubbing from Base UI. The steppers press with seam depth.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <NumberFieldDemo />,
            code: exampleSource("number-field-demo"),
          },
          {
            key: "format",
            title: "Currency",
            component: <NumberFieldFormat />,
            code: exampleSource("number-field-format"),
          },
          {
            key: "disabled",
            title: "Disabled",
            component: <NumberFieldDisabled />,
            code: exampleSource("number-field-disabled"),
          },
        ]}
      />

      <Install name="number-field" />

      <Notes>
        <li>
          Base UI enables click-and-drag <em>scrubbing</em> on the input — drag
          horizontally to change the value without the steppers.
        </li>
        <li>
          A labelled spinbutton with extended keyboard stepping: arrows plus
          Page Up/Down for larger jumps and Home/End for min/max.
        </li>
      </Notes>
    </main>
  )
}
