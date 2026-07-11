import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import RadioGroupDemo from "@/registry/seam/examples/radio-group-demo"
import RadioGroupDescriptions from "@/registry/seam/examples/radio-group-descriptions"
import RadioGroupDisabled from "@/registry/seam/examples/radio-group-disabled"

export const metadata: Metadata = {
  title: "Radio Group — seamui",
  description: "Radio group built on Base UI; the dot pops in with a spring.",
}

export default function RadioGroupDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Radio Group</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A set of options where only one can be selected. The selected dot pops
        in with a spring.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <RadioGroupDemo />,
            code: exampleSource("radio-group-demo"),
          },
          {
            key: "descriptions",
            title: "With descriptions",
            component: <RadioGroupDescriptions />,
            code: exampleSource("radio-group-descriptions"),
          },
          {
            key: "disabled",
            title: "Disabled",
            component: <RadioGroupDisabled />,
            code: exampleSource("radio-group-disabled"),
          },
        ]}
      />

      <Install name="radio-group" />

      <Notes>
        <li>
          Selecting an item mounts its indicator and scales the dot in from 0.
        </li>
        <li>
          Controlled via <code>value</code> / <code>onValueChange</code>,
          uncontrolled via <code>defaultValue</code>; arrow keys move the
          selection between items.
        </li>
      </Notes>
    </main>
  )
}
