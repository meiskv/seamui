import { MailCheck } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/registry/seam/ui/alert"

export default function AlertDemo() {
  return (
    <Alert className="max-w-md">
      <MailCheck />
      <AlertTitle>Check your inbox</AlertTitle>
      <AlertDescription>
        We sent a verification link to your email address. It expires in 24
        hours.
      </AlertDescription>
    </Alert>
  )
}
