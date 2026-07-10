import { Checkbox } from "@/registry/seam/ui/checkbox"

export default function CheckboxDisabled() {
  return (
    <div className="grid gap-2.5 text-sm">
      <label className="flex items-center gap-2 opacity-50">
        <Checkbox disabled />
        Unchecked
      </label>
      <label className="flex items-center gap-2 opacity-50">
        <Checkbox disabled defaultChecked />
        Checked
      </label>
    </div>
  )
}
