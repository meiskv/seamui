import { Switch } from "@/registry/seam/ui/switch"

const SETTINGS = [
  { label: "Wi-Fi", on: true },
  { label: "Bluetooth", on: true },
  { label: "Airplane mode", on: false },
]

export default function SwitchSettings() {
  return (
    <div className="w-full max-w-xs divide-y rounded-xl squircle border">
      {SETTINGS.map((s) => (
        <label
          key={s.label}
          className="flex items-center justify-between px-4 py-3 text-sm"
        >
          {s.label}
          <Switch defaultChecked={s.on} />
        </label>
      ))}
    </div>
  )
}
