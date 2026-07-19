import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import FieldDemo from "@/registry/seam/examples/field-demo"
import FieldValidation from "@/registry/seam/examples/field-validation"
import FieldFieldset from "@/registry/seam/examples/field-fieldset"

export const metadata: Metadata = {
  title: "Field — seamui",
  description:
    "Labelled form field with description and validation, built on Base UI Field + Fieldset.",
}

export default function FieldDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Field</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A labelled form row that auto-wires its label, description, and error
        messages to the control, with client-side validation from Base UI. Group
        related fields with <code>Fieldset</code>.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <FieldDemo />,
            code: exampleSource("field-demo"),
          },
          {
            key: "validation",
            title: "Validation",
            component: <FieldValidation />,
            code: exampleSource("field-validation"),
          },
          {
            key: "fieldset",
            title: "Fieldset",
            component: <FieldFieldset />,
            code: exampleSource("field-fieldset"),
          },
        ]}
      />

      <Install name="field" />

      <Notes>
        <li>
          <code>FieldControl</code> renders the seam <code>Input</code> by
          default; pass <code>render</code> to wire a Textarea or Select, or
          drop any Field-aware seam control inside <code>Field</code> directly.
        </li>
        <li>
          <code>FieldError</code> only renders when the field is invalid; use{" "}
          <code>match</code> to target a specific constraint (
          <code>valueMissing</code>, <code>tooShort</code>, …).
        </li>
        <li>
          Invalid state flows to the control as <code>data-[invalid]</code>;
          pair with <code>Form</code> to focus the first invalid field on
          submit.
        </li>
      </Notes>
    </main>
  )
}
