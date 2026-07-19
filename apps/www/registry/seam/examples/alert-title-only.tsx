import { Info } from "lucide-react"

import { Alert, AlertTitle } from "@/registry/seam/ui/alert"

// Icon and description are both optional — a bare title still lines up.
export default function AlertTitleOnly() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert>
        <Info />
        <AlertTitle>Scheduled maintenance on Sunday, 02:00 UTC.</AlertTitle>
      </Alert>
      <Alert>
        <AlertTitle>You&apos;re on the free plan.</AlertTitle>
      </Alert>
    </div>
  )
}
