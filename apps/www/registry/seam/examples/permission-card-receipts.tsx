import {
  PermissionCard,
  PermissionCardCommand,
} from "@/registry/seam/ui/permission-card"

// The four settled states — an audit trail, not dead prompts.
export default function PermissionCardReceipts() {
  return (
    <div className="flex flex-col gap-3">
      <PermissionCard title="Read .env.production" decision="allowed" />
      <PermissionCard title="Run git push" decision="allowed-session">
        <PermissionCardCommand>
          git push -u origin claude/billing-webhooks
        </PermissionCardCommand>
      </PermissionCard>
      <PermissionCard title="Delete node_modules" decision="denied" />
      <PermissionCard title="Format with Biome" decision="auto" />
    </div>
  )
}
