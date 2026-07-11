import { Button } from "@/registry/seam/ui/button"
import { Input } from "@/registry/seam/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/seam/ui/popover"

export default function PopoverForm() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Settings</Button>} />
      <PopoverContent>
        <div className="space-y-3">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Dimensions</h4>
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the surface.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="width" className="text-sm">
                Width
              </label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="maxWidth" className="text-sm">
                Max. width
              </label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="height" className="text-sm">
                Height
              </label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
