"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Copy } from "lucide-react"
import { createHighlighterCore } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

import { cn } from "@/lib/utils"
import { fades } from "@/lib/motion"
import { Badge } from "./badge"
import { Button } from "./button"

// Fine-grained shiki: instead of the full bundle (every grammar + the ~500KB
// Oniguruma WASM), we load a single highlighter with just the web languages
// below and shiki's pure-JS regex engine (no WASM). Grammars/themes are dynamic
// imports, so they code-split into their own chunks and never touch a page's
// initial JS — only a mounted CodeBlock pays for them. Need another language?
// Add its `import("shiki/langs/<name>.mjs")` line; aliases (ts, js, sh, shell)
// come registered with the grammar. Unknown languages fall back to plain text.
let highlighterPromise: ReturnType<typeof createHighlighterCore> | null = null
function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [
        import("shiki/themes/github-light.mjs"),
        import("shiki/themes/github-dark.mjs"),
      ],
      langs: [
        import("shiki/langs/tsx.mjs"),
        import("shiki/langs/jsx.mjs"),
        import("shiki/langs/typescript.mjs"),
        import("shiki/langs/javascript.mjs"),
        import("shiki/langs/json.mjs"),
        import("shiki/langs/bash.mjs"),
        import("shiki/langs/css.mjs"),
        import("shiki/langs/html.mjs"),
      ],
      // `forgiving` skips the rare grammar regex the JS engine can't compile
      // (some shell patterns) instead of throwing — highlighting degrades, never breaks.
      engine: createJavaScriptRegexEngine({ forgiving: true }),
    })
  }
  return highlighterPromise
}

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
    getHighlighter()
      .then((hl) => {
        if (!active) return
        // Only highlight languages we bundled; anything else renders as plain
        // text (shiki's built-in "text" needs no grammar) — never throws.
        const lang = hl.getLoadedLanguages().includes(language)
          ? language
          : "text"
        setHtml(
          hl.codeToHtml(source, {
            lang,
            themes: { light: "github-light", dark: "github-dark" },
            defaultColor: false,
          })
        )
      })
      // load failure → keep the plain-text fallback
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
          // Raised control strip (bg-secondary): the language badge + copy key read
          // as lifted chrome, not sunk into the debossed code well below.
          className="bg-secondary flex items-center justify-between gap-2 border-b border-border/60 px-2 py-1"
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
