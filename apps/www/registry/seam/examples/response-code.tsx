import { Response } from "@/registry/seam/ui/response"

const MARKDOWN = `A fenced block renders as a debossed well; inline \`cn()\` stays a chip.

\`\`\`tsx
function Button({ variant, size, ...props }: ButtonProps) {
  return <BaseButton className={cn(buttonVariants({ variant, size }))} {...props} />
}
\`\`\`

| Token | Use |
| --- | --- |
| \`springs.press\` | press-down feedback |
| \`depth.overlay\` | floating surfaces |`

export default function ResponseCode() {
  return (
    <div className="w-full max-w-md">
      <Response>{MARKDOWN}</Response>
    </div>
  )
}
