"use client"

import {
  CodeBlock as SeamCodeBlock,
  CodeBlockCopyButton,
} from "@/registry/seam/ui/code-block"

/**
 * Docs-site code block — a compact wrapper over the registry's shiki
 * CodeBlock so every snippet on the site is syntax-highlighted (dual-theme)
 * with a copy key, headerless to stay quiet next to prose.
 */
export function CodeBlock({
  children,
  language = "tsx",
}: {
  children: string
  language?: string
}) {
  return (
    <div className="relative">
      <SeamCodeBlock
        code={children}
        language={language}
        showHeader={false}
        className="[&_[data-slot=code-block-content]]:pr-11"
      />
      <CodeBlockCopyButton code={children} className="absolute top-1 right-1" />
    </div>
  )
}
