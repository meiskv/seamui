import { RadioGroup, RadioGroupItem } from "@/registry/seam/ui/radio-group"

const PLANS = [
  {
    value: "spring",
    title: "Springs",
    desc: "Physics-based, reacts to velocity.",
  },
  {
    value: "duration",
    title: "Durations",
    desc: "A fixed clock; opacity only.",
  },
]

export default function RadioGroupDescriptions() {
  return (
    <RadioGroup defaultValue="spring" className="max-w-xs gap-2">
      {PLANS.map((p) => (
        <label
          key={p.value}
          className="has-data-[checked]:border-primary has-data-[checked]:bg-secondary flex cursor-pointer items-start gap-2.5 rounded-lg squircle border p-3 shadow-resting"
        >
          <RadioGroupItem value={p.value} className="mt-0.5" />
          <div className="grid gap-0.5 text-sm leading-none">
            <span className="font-medium">{p.title}</span>
            <span className="text-muted-foreground">{p.desc}</span>
          </div>
        </label>
      ))}
    </RadioGroup>
  )
}
