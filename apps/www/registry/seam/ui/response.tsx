"use client"

import * as React from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"
import { CodeBlock } from "./code-block"

// Streaming hardening: a half-arrived response often ends mid-code-fence. Left
// as-is, the open ``` swallows the rest of the stream into one broken <pre>.
// Closing the dangling fence keeps each frame renderable while tokens land.
function completeMarkdown(md: string): string {
  const fences = md.match(/^[ \t]*(```|~~~)/gm)
  if (fences && fences.length % 2 === 1) {
    const marker = fences[fences.length - 1].trim().slice(0, 3)
    return `${md}\n${marker}`
  }
  return md
}

// Fenced code renders through the seam CodeBlock (well + copy + highlight);
// inline code stays a debossed chip. `pre` becomes a pass-through since
// CodeBlock brings its own container.
const components: Components = {
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "text-primary font-medium underline underline-offset-4",
        className
      )}
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  pre: ({ children }) => <>{children}</>,
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className ?? "")
    const text = String(children ?? "")
    // A fence with no language still arrives multiline — treat it as a block.
    const isBlock = !!match || text.includes("\n")
    if (isBlock) {
      return (
        <CodeBlock
          code={text.replace(/\n$/, "")}
          language={match?.[1] ?? "text"}
          className="my-3"
        />
      )
    }
    return (
      <code
        className={cn(
          "bg-muted rounded squircle px-1.5 py-0.5 text-[0.85em] shadow-well",
          className
        )}
        {...props}
      >
        {children}
      </code>
    )
  },
  table: ({ className, ...props }) => (
    <div className="my-3 overflow-x-auto">
      <table
        className={cn("w-full border-collapse text-sm", className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border border-border/60 px-3 py-1.5 text-left font-medium",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn("border border-border/60 px-3 py-1.5", className)}
      {...props}
    />
  ),
}

// Renders a (possibly incomplete) markdown string as flat seam prose. Prose
// sits on the canvas — no bubble, no depth; depth belongs to interactive
// things. Streamed text appends without per-character animation (explicitly
// forbidden) and without layout springs — reflowing text must never bounce;
// the sense of life comes from the viewport following along, not the letters.
function Response({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & { children: string }) {
  const safe = React.useMemo(() => completeMarkdown(children ?? ""), [children])

  return (
    <div
      data-slot="response"
      className={cn(
        "text-sm leading-relaxed",
        "space-y-3 [&>:first-child]:mt-0 [&>:last-child]:mb-0",
        "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1",
        "[&_h1]:mt-4 [&_h1]:text-lg [&_h1]:font-semibold [&_h2]:mt-4 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mt-3 [&_h3]:font-medium",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground",
        "[&_strong]:font-semibold [&_hr]:my-4 [&_hr]:border-border",
        className
      )}
      {...props}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {safe}
      </ReactMarkdown>
    </div>
  )
}

export { Response }
