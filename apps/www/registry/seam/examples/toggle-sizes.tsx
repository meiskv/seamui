import { Underline } from "lucide-react"

import { Toggle } from "@/registry/seam/ui/toggle"

export default function ToggleSizes() {
  return (
    <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Small">
        <Underline />
      </Toggle>
      <Toggle size="default" aria-label="Default">
        <Underline />
      </Toggle>
      <Toggle size="lg" aria-label="Large">
        <Underline />
      </Toggle>
    </div>
  )
}
