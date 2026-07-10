import { Slider } from "@/registry/seam/ui/slider"

export default function SliderDisabled() {
  return (
    <div className="w-full max-w-xs opacity-50">
      <Slider defaultValue={30} max={100} step={1} disabled />
    </div>
  )
}
