import { Kbd, KbdGroup } from "@/registry/seam/ui/kbd"

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-3 text-sm">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <p className="text-muted-foreground">
        Press <Kbd>⇧</Kbd> <Kbd>Enter</Kbd> for a new line
      </p>
    </div>
  )
}
