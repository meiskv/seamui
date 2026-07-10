import { RadioGroup, RadioGroupItem } from "@/registry/seam/ui/radio-group"

export default function RadioGroupDisabled() {
  return (
    <RadioGroup defaultValue="spring" disabled>
      {["spring", "duration"].map((v) => (
        <label
          key={v}
          className="flex items-center gap-2 text-sm capitalize opacity-50"
        >
          <RadioGroupItem value={v} />
          {v}
        </label>
      ))}
    </RadioGroup>
  )
}
