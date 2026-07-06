import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/seam/ui/select"

export default function SelectDemo() {
  return (
    <Select defaultValue="spring">
      <SelectTrigger className="w-52">
        <SelectValue placeholder="Choose a transition" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="spring">Spring</SelectItem>
        <SelectItem value="snappy">Snappy</SelectItem>
        <SelectItem value="surface">Surface</SelectItem>
        <SelectItem value="bouncy">Bouncy</SelectItem>
      </SelectContent>
    </Select>
  )
}
