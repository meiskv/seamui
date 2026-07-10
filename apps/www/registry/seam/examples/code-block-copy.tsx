import { CodeBlock } from "@/registry/seam/ui/code-block"

// Press the copy key in the header — the icon crossfades to a check and back.
export default function CodeBlockCopy() {
  return (
    <div className="w-full max-w-md">
      <CodeBlock
        language="bash"
        code={`npx shadcn@latest add https://seamui.dev/r/code-block.json`}
      />
    </div>
  )
}
