import { NumberField } from "@/registry/seam/ui/number-field"

export default function NumberFieldDisabled() {
  return <NumberField defaultValue={3} min={0} max={10} disabled />
}
