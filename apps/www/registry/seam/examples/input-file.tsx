import { Input } from "@/registry/seam/ui/input"

export default function InputFile() {
  return (
    <Input
      type="file"
      aria-label="Upload file"
      className="max-w-xs file:mr-3 file:text-muted-foreground"
    />
  )
}
