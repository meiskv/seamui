import { ContextMeter } from "@/registry/seam/ui/context-meter"

// Map tokens-used / window-size straight onto value / max.
export default function ContextMeterDemo() {
  return <ContextMeter value={124_000} max={200_000} size="md" showValue />
}
