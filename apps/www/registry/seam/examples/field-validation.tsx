import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/seam/ui/field"

export default function FieldValidation() {
  return (
    <Field className="w-72" name="username">
      <FieldLabel>Username</FieldLabel>
      <FieldControl
        required
        minLength={3}
        placeholder="at least 3 characters"
      />
      <FieldError match="valueMissing">A username is required.</FieldError>
      <FieldError match="tooShort">Use at least 3 characters.</FieldError>
    </Field>
  )
}
