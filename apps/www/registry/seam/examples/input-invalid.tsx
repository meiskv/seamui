import { Input } from "@/registry/seam/ui/input"

export default function InputInvalid() {
  return (
    <div className="grid w-full max-w-xs gap-1.5">
      <Input
        type="email"
        defaultValue="not-an-email"
        aria-invalid
        aria-describedby="email-error"
        className="w-full"
      />
      <p id="email-error" className="text-destructive text-xs">
        Enter a valid email address.
      </p>
    </div>
  )
}
