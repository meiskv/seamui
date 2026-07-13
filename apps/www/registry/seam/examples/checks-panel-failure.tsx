import {
  ChecksPanel,
  ChecksPanelFooter,
  ChecksPanelItem,
  MergeButton,
} from "@/registry/seam/ui/checks-panel"

// A failed check carries its log one disclosure away — attach it to the
// thread, fix, re-run.
export default function ChecksPanelFailure() {
  return (
    <ChecksPanel summary="2 passed, 1 failed, 1 skipped">
      <ChecksPanelItem name="lint" status="pass" duration="11s" />
      <ChecksPanelItem name="typecheck" status="fail" duration="38s">
        {`registry/seam/ui/diff-view.tsx(88,14): error TS2322:
  Type 'string | undefined' is not assignable to type 'string'.

Found 1 error in registry/seam/ui/diff-view.tsx:88`}
      </ChecksPanelItem>
      <ChecksPanelItem name="test" status="pass" duration="59s" />
      <ChecksPanelItem name="e2e" status="skipped" />
      <ChecksPanelFooter>
        <MergeButton method="squash" disabled />
      </ChecksPanelFooter>
    </ChecksPanel>
  )
}
