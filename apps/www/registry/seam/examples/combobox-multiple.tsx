"use client"

import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/registry/seam/ui/combobox"

const languages = [
  { value: "ts", label: "TypeScript" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "python", label: "Python" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
]

type Language = (typeof languages)[number]

export default function ComboboxMultiple() {
  return (
    <div className="w-72">
      <Combobox
        multiple
        items={languages}
        defaultValue={[languages[0], languages[1]]}
        itemToStringLabel={(l: Language) => l.label}
      >
        <ComboboxChips>
          <ComboboxValue>
            {(selected: Language[]) =>
              selected.map((l) => (
                <ComboboxChip key={l.value}>
                  {l.label}
                  <ComboboxChipRemove />
                </ComboboxChip>
              ))
            }
          </ComboboxValue>
          <ComboboxChipsInput placeholder="Add language…" />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxEmpty>No language found.</ComboboxEmpty>
          <ComboboxList>
            {(l: Language) => (
              <ComboboxItem key={l.value} value={l}>
                {l.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
