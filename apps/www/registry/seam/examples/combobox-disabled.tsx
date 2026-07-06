"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/seam/ui/combobox"

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
  { value: "enterprise", label: "Enterprise" },
]

type Plan = (typeof plans)[number]

export default function ComboboxDisabled() {
  return (
    <div className="w-64">
      <Combobox
        disabled
        items={plans}
        defaultValue={plans[1]}
        itemToStringLabel={(p: Plan) => p.label}
      >
        <ComboboxInput placeholder="Select a plan…" />
        <ComboboxContent>
          <ComboboxEmpty>No plan found.</ComboboxEmpty>
          <ComboboxList>
            {(p: Plan) => (
              <ComboboxItem key={p.value} value={p}>
                {p.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
