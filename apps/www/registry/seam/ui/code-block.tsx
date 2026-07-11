"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Copy } from "lucide-react"
import { codeToHtml } from "shiki"

import { cn } from "@/lib/utils"
import { fades } from "@/lib/motion"
import { Badge } from "./badge"
import { Button } from "./button"

// Shiki runs in dual-theme mode (defaultColor:false → each token carries a
// --shiki-light and --shiki-dark var). These rules pick the right one per
// theme and let the debossed well show through, so the dark gate passes
// without shipping a second highlighted payload.
const THEME_CSS = `
.seam-code .shiki,
.seam-code .shiki span { color: var(--shiki-light); background-color: transparent !important; }
.dark .seam-code .shiki,
.dark .seam-code .shiki span { color: var(--shiki-dark); }
.seam-code .shiki { margin: 0; }
`

function CodeBlockCopyButton({
  code,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { code: string }) {
  const [copied, setCopied] = React.useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable (insecure context) — silently no-op
    }
  }

  return (
    <Button
      data-slot="code-block-copy"
      variant="ghost"
      size="icon"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      className={cn("text-muted-foreground size-7", className)}
      {...props}
    >
      {/* Confirmation is an opacity crossfade — identical under reduced motion. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fades.fast}
          className="flex items-center justify-center"
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}

// Code is content you look *into* — so the block is a debossed well, with the
// copy key embossed in its header. Highlighting resolves asynchronously; until
// it does (and while a fence is still streaming) the raw text renders, so the
// block is never blank and never breaks mid-stream.
function CodeBlock({
  code,
  language = "text",
  showHeader = true,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  code: string
  language?: string
  showHeader?: boolean
}) {
  const source = code.replace(/\n$/, "")
  const [html, setHtml] = React.useState<string | null>(null)

  React.useEffect(() => {
    let active = true
    codeToHtml(source, {
      lang: language,
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    })
      .then((h) => active && setHtml(h))
      // unknown language / load failure → keep the plain-text fallback
      .catch(() => active && setHtml(null))
    return () => {
      active = false
    }
  }, [source, language])

  return (
    <div
      data-slot="code-block"
      className={cn(
        "seam-code bg-muted overflow-hidden rounded-lg squircle border border-border/60 shadow-well",
        className
      )}
      {...props}
    >
      <style>{THEME_CSS}</style>
      {showHeader && (
        <div
          data-slot="code-block-header"
          className="flex items-center justify-between gap-2 border-b border-border/60 px-2 py-1"
        >
          <Badge variant="muted" className="font-mono shadow-none">
            {language}
          </Badge>
          <CodeBlockCopyButton code={source} />
        </div>
      )}
      <div
        data-slot="code-block-content"
        // Keyboard users can scroll a wide block.
        tabIndex={0}
        className="overflow-x-auto p-3 text-[0.85em] leading-relaxed outline-none [&_pre]:bg-transparent!"
      >
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="font-mono whitespace-pre">
            <code>{source}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

export { CodeBlock, CodeBlockCopyButton }
