import { CodeBlock } from "@/registry/seam/ui/code-block"

const CODE = `import { Button } from "@/components/ui/button"

export function Save() {
  return <Button variant="secondary">Save changes</Button>
}`

export default function CodeBlockDemo() {
  return (
    <div className="w-full max-w-md">
      <CodeBlock code={CODE} language="tsx" />
    </div>
  )
}
