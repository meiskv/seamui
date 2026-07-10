import { Switch } from "@/registry/seam/ui/switch"

export default function SwitchDisabled() {
  return (
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-2 text-sm opacity-50">
        <Switch disabled />
        Off
      </label>
      <label className="flex items-center gap-2 text-sm opacity-50">
        <Switch disabled defaultChecked />
        On
      </label>
    </div>
  )
}
