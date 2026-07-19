import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/registry/seam/ui/field"

export default function FieldDemo() {
  return (
    <Field className="w-72">
      <FieldLabel>Email</FieldLabel>
      <FieldControl type="email" placeholder="you@example.com" />
      <FieldDescription>We'll never share your email.</FieldDescription>
    </Field>
  )
}
