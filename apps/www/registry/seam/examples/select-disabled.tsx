import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/seam/ui/select"

export default function SelectDisabled() {
  return (
    <Select defaultValue="spring" disabled>
      <SelectTrigger className="w-52">
        <SelectValue placeholder="Choose a transition" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="spring">Spring</SelectItem>
        <SelectItem value="snappy">Snappy</SelectItem>
      </SelectContent>
    </Select>
  )
}
