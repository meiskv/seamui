import { Input } from "@/registry/seam/ui/input"

export default function InputDisabled() {
  return (
    <Input
      type="email"
      placeholder="Email"
      defaultValue="m@example.com"
      disabled
      className="max-w-xs"
    />
  )
}
