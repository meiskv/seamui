"use client"

import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"

import { Toggle } from "@/registry/seam/ui/toggle"
import { ToggleGroup } from "@/registry/seam/ui/toggle-group"

export default function ToggleGroupDisabled() {
  return (
    <ToggleGroup defaultValue={["center"]} disabled>
      <Toggle value="left" aria-label="Align left">
        <AlignLeft />
      </Toggle>
      <Toggle value="center" aria-label="Align center">
        <AlignCenter />
      </Toggle>
      <Toggle value="right" aria-label="Align right">
        <AlignRight />
      </Toggle>
    </ToggleGroup>
  )
}
