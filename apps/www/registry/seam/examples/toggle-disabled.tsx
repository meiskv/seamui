import { Bold } from "lucide-react"

import { Toggle } from "@/registry/seam/ui/toggle"

export default function ToggleDisabled() {
  return (
    <Toggle disabled defaultPressed aria-label="Toggle bold">
      <Bold />
    </Toggle>
  )
}
