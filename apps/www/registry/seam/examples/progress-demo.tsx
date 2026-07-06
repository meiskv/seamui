"use client"

import * as React from "react"

import { Progress } from "@/registry/seam/ui/progress"

export default function ProgressDemo() {
  const [value, setValue] = React.useState(30)

  React.useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 20)), 1200)
    return () => clearInterval(id)
  }, [])

  return <Progress value={value} className="w-64" />
}
