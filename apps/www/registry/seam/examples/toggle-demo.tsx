import { Bold } from "lucide-react"

import { Toggle } from "@/registry/seam/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold />
    </Toggle>
  )
}
