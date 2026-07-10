import { Button } from "@/registry/seam/ui/button"
import { Spinner } from "@/registry/seam/ui/spinner"

export default function ButtonLoading() {
  return (
    <Button disabled>
      <Spinner />
      Please wait
    </Button>
  )
}
