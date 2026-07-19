import { AlertTriangle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/registry/seam/ui/alert"

export default function AlertDestructive() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertTriangle />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your card was declined. Update your billing details and try again.
      </AlertDescription>
    </Alert>
  )
}
