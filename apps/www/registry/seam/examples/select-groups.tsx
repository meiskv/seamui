import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/seam/ui/select"

export default function SelectGroups() {
  return (
    <Select defaultValue="press">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Choose a spring" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Interaction</SelectLabel>
          <SelectItem value="press">Press</SelectItem>
          <SelectItem value="snappy">Snappy</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Surfaces</SelectLabel>
          <SelectItem value="surface">Surface</SelectItem>
          <SelectItem value="bouncy">Bouncy</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
