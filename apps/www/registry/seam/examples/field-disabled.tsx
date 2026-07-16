import { Field, FieldDescription, FieldLabel } from "@/registry/seam/ui/field"
import { Input } from "@/registry/seam/ui/input"

export default function FieldDisabled() {
  return (
    <Field name="workspace" disabled className="max-w-xs">
      <FieldLabel>Workspace</FieldLabel>
      <Input defaultValue="acme-inc" />
      <FieldDescription>Contact an admin to rename.</FieldDescription>
    </Field>
  )
}
