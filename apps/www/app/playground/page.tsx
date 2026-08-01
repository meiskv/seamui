import type { Metadata } from "next"

import { Playground } from "@/components/playground/playground"

export const metadata: Metadata = {
  title: "Playground — seamui",
  description:
    "Tune a seamui component's variants and composition, watch it live, and copy the generated code.",
}

export default function PlaygroundPage() {
  return <Playground />
}
