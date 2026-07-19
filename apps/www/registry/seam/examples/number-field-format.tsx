import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/seam/ui/number-field"

export default function NumberFieldFormat() {
  return (
    <NumberField
      defaultValue={9}
      min={0}
      step={1}
      format={{ style: "currency", currency: "USD" }}
    >
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput aria-label="Price" className="w-20" />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  )
}
