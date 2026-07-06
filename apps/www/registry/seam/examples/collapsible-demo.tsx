import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/seam/ui/collapsible"

export default function CollapsibleDemo() {
  return (
    <Collapsible className="w-72 space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">seamui springs</span>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon" aria-label="Toggle">
              <ChevronsUpDown />
            </Button>
          }
        />
      </div>
      <CollapsibleContent className="space-y-2">
        {["press", "snappy", "surface"].map((s) => (
          <div key={s} className="rounded-md border px-3 py-2 text-sm">
            springs.{s}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
