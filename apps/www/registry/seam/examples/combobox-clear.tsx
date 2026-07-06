"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/seam/ui/combobox"

const timezones = [
  { value: "utc", label: "UTC" },
  { value: "pst", label: "Pacific (PST)" },
  { value: "est", label: "Eastern (EST)" },
  { value: "cet", label: "Central European (CET)" },
  { value: "gst", label: "Gulf (GST)" },
  { value: "aest", label: "Australian Eastern (AEST)" },
]

type Timezone = (typeof timezones)[number]

export default function ComboboxClear() {
  return (
    <div className="w-64">
      {/* Starts with a value selected, so the Clear (×) button is actionable. */}
      <Combobox
        items={timezones}
        defaultValue={timezones[4]}
        itemToStringLabel={(t: Timezone) => t.label}
      >
        <ComboboxInput placeholder="Search timezone…" />
        <ComboboxContent>
          <ComboboxEmpty>No timezone found.</ComboboxEmpty>
          <ComboboxList>
            {(t: Timezone) => (
              <ComboboxItem key={t.value} value={t}>
                {t.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
