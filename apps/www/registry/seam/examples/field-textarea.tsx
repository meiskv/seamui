import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/registry/seam/ui/field"
import { Textarea } from "@/registry/seam/ui/textarea"

// Input is Field-aware on its own; any other control joins the field through
// FieldControl's render prop — label focus, validation, and aria wiring
// included.
export default function FieldTextarea() {
  return (
    <Field name="feedback" className="w-full max-w-sm">
      <FieldLabel>Feedback</FieldLabel>
      <FieldControl
        render={<Textarea placeholder="What should we improve?" />}
      />
      <FieldDescription>Shared with the whole team.</FieldDescription>
    </Field>
  )
}
