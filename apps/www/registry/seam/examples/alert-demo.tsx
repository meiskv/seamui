import { Rocket } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/registry/seam/ui/alert"

export default function AlertDemo() {
  return (
    <Alert className="max-w-md">
      <Rocket />
      <AlertTitle>Deploy complete</AlertTitle>
      <AlertDescription>
        Your changes are live. It may take a minute to propagate to all regions.
      </AlertDescription>
    </Alert>
  )
}
