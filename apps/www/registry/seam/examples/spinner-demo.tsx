import { Spinner } from "@/registry/seam/ui/spinner"

export default function SpinnerDemo() {
  return (
    <div className="text-muted-foreground flex items-center gap-4">
      <Spinner />
      <Spinner className="size-6" />
      <Spinner className="text-primary size-8" />
    </div>
  )
}
