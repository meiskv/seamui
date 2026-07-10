import { BadgeCheck } from "lucide-react"

import { Badge } from "@/registry/seam/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Badge</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="muted">Muted</Badge>
      <Badge variant="secondary">
        <BadgeCheck />
        Verified
      </Badge>
    </div>
  )
}
