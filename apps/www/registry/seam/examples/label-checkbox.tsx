import { Label } from "@/registry/seam/ui/label"
import { Checkbox } from "@/registry/seam/ui/checkbox"

export default function LabelCheckbox() {
  return (
    <Label>
      <Checkbox defaultChecked />
      Accept terms and conditions
    </Label>
  )
}
