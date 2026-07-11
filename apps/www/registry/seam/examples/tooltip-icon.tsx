import { Plus } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/seam/ui/tooltip"

export default function TooltipIcon() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon" aria-label="Add item">
              <Plus />
            </Button>
          }
        />
        <TooltipContent>Add item</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
