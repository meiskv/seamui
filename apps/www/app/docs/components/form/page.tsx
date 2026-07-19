import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import FormDemo from "@/registry/seam/examples/form-demo"

export const metadata: Metadata = {
  title: "Form — seamui",
  description:
    "Form that collects field validity and focuses the first invalid control on submit.",
}

export default function FormDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Form</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A form that gathers the validity of its Fields and focuses the first
        invalid control on submit. Compose it with <code>Field</code> for
        per-row labels and errors.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <FormDemo />,
            code: exampleSource("form-demo"),
          },
        ]}
      />

      <Install name="form" />

      <Notes>
        <li>
          Pass <code>errors</code> and <code>onClearErrors</code> to surface
          server-side validation alongside the client-side constraints.
        </li>
        <li>
          Each <code>Field</code> needs a <code>name</code> so its value and
          errors are tracked.
        </li>
      </Notes>
    </main>
  )
}
