import { CodeBlock } from "@/registry/seam/ui/code-block"

const CODE = `const springs = { press: { type: "spring", stiffness: 600, damping: 40, mass: 0.5 }, snappy: { type: "spring", stiffness: 420, damping: 30, mass: 0.7 } }`

// A long line scrolls horizontally inside the well — the page never widens.
export default function CodeBlockLongLines() {
  return (
    <div className="w-full max-w-md">
      <CodeBlock code={CODE} language="ts" />
    </div>
  )
}
