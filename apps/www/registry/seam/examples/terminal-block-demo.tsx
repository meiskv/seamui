import { TerminalBlock } from "@/registry/seam/ui/terminal-block"

const OUTPUT = `$ bun run test --filter billing
✓ webhooks/stripe.test.ts (12 tests) 84ms
✓ webhooks/backfill.test.ts (7 tests) 41ms

Test Files  2 passed (2)
     Tests  19 passed (19)`

export default function TerminalBlockDemo() {
  return (
    <TerminalBlock
      command="bun run test --filter billing"
      status="done"
      className="w-full max-w-md"
    >
      {OUTPUT}
    </TerminalBlock>
  )
}
