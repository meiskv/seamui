import { Bold } from "lucide-react"

import { Toggle } from "@/registry/seam/ui/toggle"

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold />
      Bold
    </Toggle>
  )
}
