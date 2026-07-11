"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/seam/ui/combobox"

const users = [
  { value: "ada", name: "Ada Lovelace", role: "Engineering", initials: "AL" },
  { value: "alan", name: "Alan Turing", role: "Research", initials: "AT" },
  { value: "grace", name: "Grace Hopper", role: "Engineering", initials: "GH" },
  {
    value: "katherine",
    name: "Katherine Johnson",
    role: "Research",
    initials: "KJ",
  },
]

type User = (typeof users)[number]

export default function ComboboxCustom() {
  return (
    <div className="w-72">
      <Combobox items={users} itemToStringLabel={(u: User) => u.name}>
        <ComboboxInput placeholder="Assign to…" />
        <ComboboxContent>
          <ComboboxEmpty>No teammate found.</ComboboxEmpty>
          <ComboboxList>
            {(user: User) => (
              <ComboboxItem key={user.value} value={user} className="py-2">
                {/* Custom item content — avatar + name + role. */}
                <span className="bg-secondary text-secondary-foreground shadow-resting flex size-7 items-center justify-center rounded-full text-xs font-medium">
                  {user.initials}
                </span>
                <span className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {user.role}
                  </span>
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
