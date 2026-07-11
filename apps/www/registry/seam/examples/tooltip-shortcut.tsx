import { Button } from "@/registry/seam/ui/button"
import { Kbd } from "@/registry/seam/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/seam/ui/tooltip"

export default function TooltipShortcut() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Save</Button>} />
        <TooltipContent>
          <span className="flex items-center gap-2">
            Save <Kbd>⌘S</Kbd>
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
