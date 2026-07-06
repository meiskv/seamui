import { Meter, MeterLabel, MeterValue } from "@/registry/seam/ui/meter"

export default function MeterDemo() {
  return (
    <Meter value={72} className="w-64">
      <div className="flex items-center justify-between">
        <MeterLabel>Storage used</MeterLabel>
        <MeterValue />
      </div>
    </Meter>
  )
}
