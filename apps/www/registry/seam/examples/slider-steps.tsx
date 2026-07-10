import { Slider } from "@/registry/seam/ui/slider"

export default function SliderSteps() {
  return (
    <div className="w-full max-w-xs">
      <Slider defaultValue={40} max={100} step={20} />
      <div className="text-muted-foreground mt-2 flex justify-between text-xs tabular-nums">
        {[0, 20, 40, 60, 80, 100].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  )
}
