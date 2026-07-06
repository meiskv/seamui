"use client"

import { Button } from "@/registry/seam/ui/button"
import { ToastProvider, useToast } from "@/registry/seam/ui/toast"

function ToastButton() {
  const toast = useToast()
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.add({
          title: "Saved",
          description: "Your changes bounced into view.",
        })
      }
    >
      Show toast
    </Button>
  )
}

export default function ToastDemo() {
  return (
    <ToastProvider>
      <ToastButton />
    </ToastProvider>
  )
}
