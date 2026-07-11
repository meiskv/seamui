import { Response } from "@/registry/seam/ui/response"

const MARKDOWN = `Springs beat durations because they carry **velocity**. A few consequences:

- an interrupted animation redirects smoothly
- release always settles naturally
- there is no fixed clock to fight

Inline code like \`springs.press\` stays debossed, and blocks get a well:

\`\`\`ts
whileTap={reduceMotion ? reduced.pressed : depth.pressed}
\`\`\`

> Reduced motion swaps movement for opacity — it never removes feedback.`

export default function ResponseDemo() {
  return (
    <div className="w-full max-w-md">
      <Response>{MARKDOWN}</Response>
    </div>
  )
}
