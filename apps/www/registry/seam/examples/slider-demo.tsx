import { Slider } from "@/registry/seam/ui/slider"

export default function SliderDemo() {
  return (
    <div className="w-full max-w-xs">
      <Slider defaultValue={50} max={100} step={1} />
    </div>
  )
}
