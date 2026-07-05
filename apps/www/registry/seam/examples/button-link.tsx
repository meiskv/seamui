import { Button } from "@/registry/seam/ui/button"

export default function ButtonLink() {
  // Base UI's `render` prop replaces Radix/shadcn's `asChild`.
  return (
    <Button variant="link" render={<a href="/docs/components/button" />}>
      Read the docs
    </Button>
  )
}
