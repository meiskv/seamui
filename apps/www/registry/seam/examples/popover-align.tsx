import { Button } from "@/registry/seam/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/seam/ui/popover"

export default function PopoverAlign() {
  return (
    <div className="flex gap-3">
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline">Align start</Button>}
        />
        <PopoverContent align="start">
          <p className="text-sm">Aligned to the start edge of the trigger.</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline">Align end</Button>}
        />
        <PopoverContent align="end">
          <p className="text-sm">Aligned to the end edge of the trigger.</p>
        </PopoverContent>
      </Popover>
    </div>
  )
}
