import { Button } from "@/registry/seam/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/seam/ui/popover"

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open</Button>} />
      <PopoverContent>
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Dimensions</h4>
          <p className="text-muted-foreground text-sm">
            Set the surface size. The panel rises toward you on open.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
