import { Meter, MeterLabel, MeterValue } from "@/registry/seam/ui/meter"

const LEVELS = [
  { label: "CPU", value: 28 },
  { label: "Memory", value: 61 },
  { label: "Disk", value: 92 },
]

export default function MeterLevels() {
  return (
    <div className="w-64 space-y-4">
      {LEVELS.map((l) => (
        <Meter key={l.label} value={l.value}>
          <div className="flex items-center justify-between">
            <MeterLabel>{l.label}</MeterLabel>
            <MeterValue />
          </div>
        </Meter>
      ))}
    </div>
  )
}
