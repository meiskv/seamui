import type { Metadata } from "next"

import { PlaygroundApp } from "@/components/playground/playground-app"

export const metadata: Metadata = {
  title: "Playground — seamui",
  description:
    "Tune a seamui component's variants and props live, inspect its anatomy, and copy the generated code.",
}

export default function PlaygroundPage() {
  return <PlaygroundApp />
}
