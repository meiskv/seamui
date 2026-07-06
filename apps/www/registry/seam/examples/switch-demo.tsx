import { Switch } from "@/registry/seam/ui/switch"

export default function SwitchDemo() {
  return (
    <label className="flex items-center gap-2 text-sm">
      <Switch defaultChecked />
      Airplane mode
    </label>
  )
}
