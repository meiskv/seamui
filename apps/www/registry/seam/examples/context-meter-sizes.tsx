import { ContextMeter } from "@/registry/seam/ui/context-meter"

export default function ContextMeterSizes() {
  return (
    <div className="flex items-center gap-6">
      <ContextMeter value={62} size="sm" />
      <ContextMeter value={62} size="md" />
      <ContextMeter value={62} size="lg" showValue />
    </div>
  )
}
