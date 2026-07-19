import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import FieldDemo from "@/registry/seam/examples/field-demo"
import FieldInvalid from "@/registry/seam/examples/field-invalid"
import FieldTextarea from "@/registry/seam/examples/field-textarea"
import FieldFieldset from "@/registry/seam/examples/field-fieldset"
import FieldDisabled from "@/registry/seam/examples/field-disabled"

export const metadata: Metadata = {
  title: "Field — seamui",
  description:
    "Label, description, and error wiring for any form control, built on Base UI Field.",
}

export default function FieldDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Field</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Accessible label, description, and validation wiring for a single form
        control. Errors shake in with the seam error pattern; pair with Form for
        whole-form submission and server errors.
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
            key: "invalid",
            title: "Validation",
            component: <FieldInvalid />,
            code: exampleSource("field-invalid"),
            description:
              "Type an uppercase letter — the error shakes in and the well goes destructive.",
          },
          {
            key: "textarea",
            title: "Textarea",
            component: <FieldTextarea />,
            code: exampleSource("field-textarea"),
          },
          {
            key: "fieldset",
            title: "Fieldset",
            component: <FieldFieldset />,
            code: exampleSource("field-fieldset"),
            description:
              "Fieldset + legend group related fields; FieldItem scopes a label to one option.",
          },
          {
            key: "disabled",
            title: "Disabled",
            component: <FieldDisabled />,
            code: exampleSource("field-disabled"),
          },
        ]}
      />

      <Install name="field" />

      <ApiTable
        rows={[
          {
            prop: "name",
            type: "string",
            desc: "Identifies the field when a form is submitted.",
          },
          {
            prop: "validate",
            type: "(value, formValues) => string | string[] | null",
            desc: "Custom validation — return the error message(s), or null when valid.",
          },
          {
            prop: "validationMode",
            type: '"onSubmit" | "onBlur" | "onChange"',
            default: '"onSubmit"',
            desc: "When validation runs; takes precedence over the Form's mode.",
          },
          {
            prop: "invalid / disabled",
            type: "boolean",
            desc: "Force the state externally, e.g. from a form library.",
          },
          {
            prop: "FieldError match",
            type: "boolean | keyof ValidityState",
            desc: 'Show only for one native validity condition (e.g. "valueMissing"), or true to control visibility yourself.',
          },
        ]}
        footer={
          <>
            Plus all Base UI <code>Field.*</code> props on the matching parts.
          </>
        }
      />

      <Notes>
        <li>
          Input is Field-aware on its own —{" "}
          <code>&lt;Field&gt;&lt;Input /&gt;&lt;/Field&gt;</code> wires label,
          description, and validity automatically. Any other control joins
          through <code>&lt;FieldControl render={"{<Textarea />}"} /&gt;</code>.
        </li>
        <li>
          FieldError fires the seam error signal — a shake (an opacity flash
          under reduced motion) plus the <code>error</code> haptic — when an
          error <em>appears</em>: on validation after user input, or when a
          message lands via <code>match</code> / the Form&apos;s{" "}
          <code>errors</code>. Errors already present at first paint render
          statically, and simultaneous field failures coalesce into one haptic.
          A custom <code>render</code> element keeps the signal.
        </li>
        <li>
          Without children, FieldError renders the message from{" "}
          <code>validate</code>, the browser&apos;s native validity text, or the
          Form&apos;s server errors — stack several with <code>match</code> for
          per-condition copy.
        </li>
        <li>
          Fieldset and FieldsetLegend group related fields under one heading;
          FieldItem labels one option inside checkbox or radio groups (see the
          Fieldset example).
        </li>
        <li>
          FieldValidity is a render-prop escape hatch: it exposes the
          control&apos;s raw <code>ValidityState</code> for fully custom
          messaging, and renders no DOM of its own.
        </li>
      </Notes>
    </main>
  )
}
