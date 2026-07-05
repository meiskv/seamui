import { RadioGroup, RadioGroupItem } from "@/registry/seam/ui/radio-group"

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="spring">
      {["spring", "duration"].map((v) => (
        <label key={v} className="flex items-center gap-2 text-sm capitalize">
          <RadioGroupItem value={v} />
          {v}
        </label>
      ))}
    </RadioGroup>
  )
}
