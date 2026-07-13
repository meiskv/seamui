import { cn } from "@/lib/utils"

import { CopyButton } from "./copy-button"

/** A copyable install command in a debossed entry well — the seam way to
 *  present a shell one-liner. Renders the client CopyButton on the right. */
export function InstallCommand({
  cmd,
  className,
}: {
  cmd: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "bg-muted squircle flex items-center gap-2 rounded-lg border border-border/60 py-1.5 pr-1.5 pl-3 shadow-well",
        className
      )}
    >
      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm whitespace-nowrap">
        <span aria-hidden className="text-primary">
          ${" "}
        </span>
        {cmd}
      </code>
      <CopyButton text={cmd} className="size-7" />
    </div>
  )
}
