"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/seam/ui/combobox"

const countries = [
  { value: "ae", label: "United Arab Emirates" },
  { value: "au", label: "Australia" },
  { value: "sg", label: "Singapore" },
  { value: "jp", label: "Japan" },
]

type Country = (typeof countries)[number]

export default function ComboboxInvalid() {
  return (
    <div className="w-64 space-y-1.5">
      <Combobox items={countries} itemToStringLabel={(c: Country) => c.label}>
        {/* aria-invalid drives the destructive border/ring. */}
        <ComboboxInput aria-invalid placeholder="Select a country…" />
        <ComboboxContent>
          <ComboboxEmpty>No country found.</ComboboxEmpty>
          <ComboboxList>
            {(c: Country) => (
              <ComboboxItem key={c.value} value={c}>
                {c.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <p className="text-destructive text-xs">Please select a country.</p>
    </div>
  )
}
