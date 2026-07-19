import { Field, FieldError } from "@/registry/seam/ui/field"
import { Input } from "@/registry/seam/ui/input"

// Invalid state comes from the surrounding Field: `invalid` paints the well
// destructive via data-[invalid], and FieldError carries the message with
// the aria wiring (and the shake, when the error appears after load).
export default function InputInvalid() {
  return (
    <Field name="email" invalid className="max-w-xs">
      <Input type="email" defaultValue="not-an-email" />
      <FieldError match>Enter a valid email address.</FieldError>
    </Field>
  )
}
