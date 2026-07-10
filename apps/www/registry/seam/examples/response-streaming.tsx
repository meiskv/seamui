"use client"

import * as React from "react"

import { Button } from "@/registry/seam/ui/button"
import { Response } from "@/registry/seam/ui/response"

const FULL = `Here is a **streamed** answer. Watch it arrive token by token:

- the dangling code fence never breaks the layout
- reflowing text does not bounce

\`\`\`ts
const spring = springs.snappy
\`\`\`

That last block stayed renderable even while the fence was still open.`

export default function ResponseStreaming() {
  const [n, setN] = React.useState(FULL.length)

  const stream = () => {
    setN(0)
    const tokens = FULL.split(/(\s+)/)
    let i = 0
    let acc = 0
    const id = setInterval(() => {
      acc += tokens[i]?.length ?? 0
      i++
      setN(acc)
      if (i >= tokens.length) clearInterval(id)
    }, 60)
  }

  return (
    <div className="w-full max-w-md space-y-3">
      <Response>{FULL.slice(0, n)}</Response>
      <Button size="sm" variant="secondary" onClick={stream}>
        Replay stream
      </Button>
    </div>
  )
}
