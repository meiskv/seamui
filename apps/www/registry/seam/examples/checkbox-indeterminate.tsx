"use client"

import * as React from "react"

import { Checkbox } from "@/registry/seam/ui/checkbox"

const ITEMS = ["Springs", "Depth", "Touch feedback"]

export default function CheckboxIndeterminate() {
  const [checked, setChecked] = React.useState([true, false, false])
  const all = checked.every(Boolean)
  const some = checked.some(Boolean)

  return (
    <div className="grid gap-2.5 text-sm">
      <label className="flex items-center gap-2 font-medium">
        <Checkbox
          checked={all}
          indeterminate={some && !all}
          onCheckedChange={(v) => setChecked(checked.map(() => v))}
        />
        Select all
      </label>
      <div className="ml-6 grid gap-2.5">
        {ITEMS.map((item, i) => (
          <label key={item} className="flex items-center gap-2">
            <Checkbox
              checked={checked[i]}
              onCheckedChange={(v) =>
                setChecked(checked.map((c, j) => (j === i ? v : c)))
              }
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  )
}
