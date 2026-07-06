"use client"

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/seam/ui/combobox"

type Food = { value: string; label: string }
type FoodGroup = { value: string; items: Food[] }

// Grouped items: each entry has a label (`value`) and its own `items`.
const groups: FoodGroup[] = [
  {
    value: "Fruits",
    items: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "grape", label: "Grape" },
    ],
  },
  {
    value: "Vegetables",
    items: [
      { value: "carrot", label: "Carrot" },
      { value: "spinach", label: "Spinach" },
      { value: "potato", label: "Potato" },
    ],
  },
]

export default function ComboboxGroups() {
  return (
    <div className="w-64">
      <Combobox items={groups} itemToStringLabel={(f: Food) => f.label}>
        <ComboboxInput placeholder="Search food…" />
        <ComboboxContent>
          <ComboboxEmpty>No food found.</ComboboxEmpty>
          <ComboboxList>
            {(group: FoodGroup) => (
              <ComboboxGroup key={group.value} items={group.items}>
                <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                <ComboboxCollection>
                  {(food: Food) => (
                    <ComboboxItem key={food.value} value={food}>
                      {food.label}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
