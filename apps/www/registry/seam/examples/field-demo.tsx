import { Field, FieldDescription, FieldLabel } from "@/registry/seam/ui/field"
import { Input } from "@/registry/seam/ui/input"

export default function FieldDemo() {
  return (
    <Field name="email" className="max-w-xs">
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="you@company.com" />
      <FieldDescription>We only use this for receipts.</FieldDescription>
    </Field>
  )
}
