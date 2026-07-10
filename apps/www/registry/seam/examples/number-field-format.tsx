import { NumberField } from "@/registry/seam/ui/number-field"

export default function NumberFieldFormat() {
  return (
    <NumberField
      defaultValue={9}
      min={0}
      step={1}
      format={{ style: "currency", currency: "USD" }}
    />
  )
}
