"use client"

import * as React from "react"

import { Button } from "@/registry/seam/ui/button"
import { Field, FieldError, FieldLabel } from "@/registry/seam/ui/field"
import { Form } from "@/registry/seam/ui/form"
import { Input } from "@/registry/seam/ui/input"

// Server-side validation: pass the response's errors — keyed by field name —
// to the `errors` prop and they render (and shake in) exactly like client
// errors. Base UI clears a field's server error as soon as it changes.
export default function FormErrors() {
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [saving, setSaving] = React.useState(false)

  return (
    <Form<{ handle: string }>
      className="max-w-xs"
      errors={errors}
      onFormSubmit={async (values) => {
        setSaving(true)
        // fake request — every handle is already taken
        await new Promise((resolve) => setTimeout(resolve, 600))
        setSaving(false)
        setErrors({ handle: `"${values.handle}" is already taken.` })
      }}
    >
      <Field name="handle">
        <FieldLabel>Workspace handle</FieldLabel>
        <Input required placeholder="acme" />
        <FieldError />
      </Field>
      <Button type="submit" disabled={saving}>
        {saving ? "Claiming…" : "Claim handle"}
      </Button>
    </Form>
  )
}
