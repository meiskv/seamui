import {
  Field,
  FieldDescription,
  FieldItem,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
} from "@/registry/seam/ui/field"
import { RadioGroup, RadioGroupItem } from "@/registry/seam/ui/radio-group"

// Fieldset + legend group related fields; inside a checkbox or radio group,
// each FieldItem scopes a label (and optional description) to one option.
export default function FieldFieldset() {
  return (
    <Fieldset className="max-w-xs">
      <FieldsetLegend>Notifications</FieldsetLegend>
      <Field name="frequency">
        <RadioGroup defaultValue="mentions">
          <FieldItem>
            <span className="flex items-center gap-2.5">
              <RadioGroupItem value="all" />
              <FieldLabel>Everything</FieldLabel>
            </span>
          </FieldItem>
          <FieldItem>
            <span className="flex items-center gap-2.5">
              <RadioGroupItem value="mentions" />
              <FieldLabel>Mentions only</FieldLabel>
            </span>
            <FieldDescription className="pl-6.5">
              Replies and direct mentions.
            </FieldDescription>
          </FieldItem>
          <FieldItem>
            <span className="flex items-center gap-2.5">
              <RadioGroupItem value="none" />
              <FieldLabel>Off</FieldLabel>
            </span>
          </FieldItem>
        </RadioGroup>
      </Field>
    </Fieldset>
  )
}
