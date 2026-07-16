"use client"

import { Field, FieldError, FieldLabel } from "@/registry/seam/ui/field"
import { Input } from "@/registry/seam/ui/input"

// The `validate` function runs on every change; when it first fails, the
// error message shakes in (opacity-only under reduced motion) and the entry
// well goes destructive via the field's data-[invalid] state.
export default function FieldInvalid() {
  return (
    <Field
      name="handle"
      className="max-w-xs"
      validationMode="onChange"
      validate={(value) => {
        const v = String(value ?? "")
        if (v !== v.toLowerCase()) return "Handles are lowercase only."
        if (v.includes(" ")) return "No spaces — try a dash."
        return null
      }}
    >
      <FieldLabel>Handle</FieldLabel>
      <Input placeholder="acme-co" />
      <FieldError />
    </Field>
  )
}
