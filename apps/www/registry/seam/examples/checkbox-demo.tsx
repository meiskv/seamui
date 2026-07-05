import { Checkbox } from "@/registry/seam/ui/checkbox"

export default function CheckboxDemo() {
  return (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox defaultChecked />
      Accept terms and conditions
    </label>
  )
}
