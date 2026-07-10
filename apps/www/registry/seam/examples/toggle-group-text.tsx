"use client"

import { Bold, Italic, Underline } from "lucide-react"

import { Toggle } from "@/registry/seam/ui/toggle"
import { ToggleGroup } from "@/registry/seam/ui/toggle-group"

export default function ToggleGroupText() {
  return (
    <ToggleGroup defaultValue={["bold"]}>
      <Toggle value="bold" aria-label="Bold">
        <Bold />
      </Toggle>
      <Toggle value="italic" aria-label="Italic">
        <Italic />
      </Toggle>
      <Toggle value="underline" aria-label="Underline">
        <Underline />
      </Toggle>
    </ToggleGroup>
  )
}
