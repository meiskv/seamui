import {
  ChecksPanel,
  ChecksPanelFooter,
  ChecksPanelItem,
  MergeButton,
} from "@/registry/seam/ui/checks-panel"

export default function ChecksPanelDemo() {
  return (
    <ChecksPanel summary="4 passed, 1 running">
      <ChecksPanelItem name="lint" status="pass" duration="12s" />
      <ChecksPanelItem name="typecheck" status="pass" duration="41s" />
      <ChecksPanelItem name="test" status="pass" duration="1m 08s" />
      <ChecksPanelItem name="motion-contract" status="pass" duration="4s" />
      <ChecksPanelItem name="e2e" status="running" />
      <ChecksPanelFooter>
        <MergeButton method="squash" disabled />
      </ChecksPanelFooter>
    </ChecksPanel>
  )
}
