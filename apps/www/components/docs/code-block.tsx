"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"

/**
 * A debossed code well with a quick-copy button. Client component so the
 * copy affordance works; dogfoods the seam Button for press feedback.
 */
export function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  function copy() {
    void navigator.clipboard?.writeText(children)
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative">
      <pre className="bg-muted squircle shadow-well overflow-x-auto rounded-lg py-2.5 pr-11 pl-3 text-[0.8125rem] leading-relaxed">
        <code>{children}</code>
      </pre>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        className="text-muted-foreground hover:text-foreground absolute top-1.5 right-1.5 size-7"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </Button>
    </div>
  )
}
