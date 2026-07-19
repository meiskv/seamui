import { CircleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/registry/seam/ui/alert"

export default function AlertDestructive() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <CircleAlert />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your card was declined. Update your billing details to keep your
        workspace active.
      </AlertDescription>
    </Alert>
  )
}
