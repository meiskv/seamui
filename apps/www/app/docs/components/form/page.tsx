import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import FormDemo from "@/registry/seam/examples/form-demo"
import FormErrors from "@/registry/seam/examples/form-errors"

export const metadata: Metadata = {
  title: "Form — seamui",
  description:
    "Native form with consolidated error handling, built on Base UI Form.",
}

export default function FormDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Form</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A native <code>&lt;form&gt;</code> that consolidates its Fields&apos;
        validation: submit runs every check, focuses the first invalid field,
        and hands you typed values once everything passes.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Sign in",
            component: <FormDemo />,
            code: exampleSource("form-demo"),
            description:
              "Submit empty to watch the first invalid field take focus and its error shake in.",
          },
          {
            key: "server",
            title: "Server errors",
            component: <FormErrors />,
            code: exampleSource("form-errors"),
            description:
              "Errors returned after submission render exactly like client ones, keyed by field name.",
          },
        ]}
      />

      <Install name="form" />

      <ApiTable
        rows={[
          {
            prop: "onFormSubmit",
            type: "(values, eventDetails) => void",
            desc: "Fires only when every field passes — values are keyed by each Field's name.",
          },
          {
            prop: "errors",
            type: "Record<string, string | string[]>",
            desc: "External (server) errors; a field's entry clears as soon as its value changes.",
          },
          {
            prop: "validationMode",
            type: '"onSubmit" | "onBlur" | "onChange"',
            default: '"onSubmit"',
            desc: "Default validation timing for every child Field.",
          },
          {
            prop: "actionsRef",
            type: "{ validate(fieldName?) }",
            desc: "Imperatively validate all fields, or one by name.",
          },
        ]}
        footer={
          <>
            Plus all Base UI <code>Form</code> props — the component is generic:{" "}
            <code>{"<Form<{ email: string }>>"}</code> types{" "}
            <code>onFormSubmit</code>&apos;s values.
          </>
        }
      />

      <Notes>
        <li>
          The form itself stays still — motion lives on the Fields inside it
          (error shake, destructive wells) and on the submit Button&apos;s press
          depth.
        </li>
        <li>
          Native constraint attributes (<code>required</code>,{" "}
          <code>minLength</code>, <code>type</code>) are the validation source;
          pair each with a <code>FieldError match</code> for custom copy.
        </li>
      </Notes>
    </main>
  )
}
