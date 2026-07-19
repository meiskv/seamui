import {
  Field,
  FieldControl,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
} from "@/registry/seam/ui/field"

export default function FieldFieldset() {
  return (
    <Fieldset className="w-72">
      <FieldsetLegend>Shipping address</FieldsetLegend>
      <Field>
        <FieldLabel>Street</FieldLabel>
        <FieldControl placeholder="123 Main St" />
      </Field>
      <Field>
        <FieldLabel>City</FieldLabel>
        <FieldControl placeholder="Springfield" />
      </Field>
    </Fieldset>
  )
}
