import { TerminalBlock } from "@/registry/seam/ui/terminal-block"

// Working shows a pulsing cursor at the output tail; waiting means the
// process needs input; error keeps the trail for diagnosis.
export default function TerminalBlockStates() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <TerminalBlock command="bun run db:migrate" status="working">
        {`Applying 3 migrations…
✓ 0041_billing_queue
✓ 0042_webhook_log
`}
      </TerminalBlock>
      <TerminalBlock command="git push" status="waiting">
        {`Username for 'https://github.com':`}
      </TerminalBlock>
      <TerminalBlock command="bun run smoke" status="error">
        {`✗ smoke: registry install failed (exit 1)
error: connect ETIMEDOUT registry.seamui.dev:443`}
      </TerminalBlock>
    </div>
  )
}
