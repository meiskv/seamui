import { Label } from "@/registry/seam/ui/label"
import { Input } from "@/registry/seam/ui/input"

export default function LabelDemo() {
  return (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Ada Lovelace" />
    </div>
  )
}
