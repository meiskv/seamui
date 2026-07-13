"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  ArrowDown,
  ArrowUp,
  Check,
  GitBranch,
  GitMerge,
  GitPullRequestArrow,
  GitPullRequestClosed,
  GitPullRequestDraft,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { fades } from "@/lib/motion"
import { Badge, badgeVariants } from "./badge"
import { Button } from "./button"

type PrState = "open" | "draft" | "merged" | "closed"

// PR state carries conventional git colors (GitHub's palette) rather than the
// seam monochrome — the color *is* the signal here. Each keeps the embossed
// key shape (border-transparent + shadow) and reads in both themes.
const PR: Record<PrState, { className: string; icon: React.ElementType }> = {
  open: {
    className: "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-black",
    icon: GitPullRequestArrow,
  },
  draft: {
    className: "bg-muted text-muted-foreground shadow-none border-border/60",
    icon: GitPullRequestDraft,
  },
  merged: {
    className: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
    icon: GitMerge,
  },
  closed: {
    className: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
    icon: GitPullRequestClosed,
  },
}

interface BranchChipProps
  extends Omit<React.ComponentProps<typeof Button>, "onCopy" | "children"> {
  branch: string
  ahead?: number
  behind?: number
  pr?: { number: number; state: PrState }
  /** Press-to-copy is the default — a branch name exists to be copied.
   *  Set false to render a static chip (e.g. inside an already-clickable row). */
  copyable?: boolean
  onCopy?: (branch: string) => void
}

// A raised key, not an entry well: the branch is a tappable surface whose one
// action is copying its name. The icon crossfades GitBranch → Check on copy
// (opacity-only, identical under reduced motion); press depth and the haptic
// tap come free from Button.
function BranchChip({
  branch,
  ahead,
  behind,
  pr,
  copyable = true,
  onCopy,
  className,
  ...props
}: BranchChipProps) {
  const [copied, setCopied] = React.useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(branch)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      onCopy?.(branch)
    } catch {
      // clipboard unavailable (insecure context) — silently no-op
    }
  }

  const sync =
    (ahead ?? 0) > 0 || (behind ?? 0) > 0 ? (
      <span
        data-slot="branch-chip-sync"
        // arrow glyphs + counts read as one little graphic: "2 ahead, 1 behind"
        // — ahead green (your commits), behind amber (need to pull), git-style.
        role="img"
        aria-label={`${ahead ?? 0} ahead, ${behind ?? 0} behind`}
        className="flex items-center gap-1 tabular-nums"
      >
        {(ahead ?? 0) > 0 && (
          <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-500">
            <ArrowUp aria-hidden className="size-2.5" />
            {ahead}
          </span>
        )}
        {(behind ?? 0) > 0 && (
          <span className="flex items-center gap-0.5 text-amber-600 dark:text-amber-500">
            <ArrowDown aria-hidden className="size-2.5" />
            {behind}
          </span>
        )}
      </span>
    ) : null

  const prBadge = pr ? (
    <Badge
      data-slot="branch-chip-pr"
      role="img"
      aria-label={`Pull request ${pr.number}, ${pr.state}`}
      className={cn("h-4 gap-0.5 px-1 text-[10px]", PR[pr.state].className)}
    >
      {(() => {
        const Icon = PR[pr.state].icon
        return <Icon aria-hidden className="size-2.5!" />
      })()}#{pr.number}
    </Badge>
  ) : null

  const name = <span className="max-w-48 truncate">{branch}</span>

  if (!copyable) {
    return (
      <span
        data-slot="branch-chip"
        className={cn(
          badgeVariants({ variant: "secondary" }),
          "gap-1.5 font-mono font-normal",
          className
        )}
        {...(props as React.ComponentProps<"span">)}
      >
        <GitBranch aria-hidden className="size-3" />
        {name}
        {sync}
        {prBadge}
      </span>
    )
  }

  return (
    <Button
      data-slot="branch-chip"
      variant="secondary"
      size="sm"
      onClick={copy}
      aria-label={copied ? "Copied" : `Copy branch name ${branch}`}
      className={cn(
        "h-7 gap-1.5 px-2.5 font-mono text-xs font-normal",
        className
      )}
      {...props}
    >
      {/* Confirmation is an opacity crossfade — identical under reduced motion. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "check" : "branch"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fades.fast}
          className="flex items-center"
        >
          {copied ? (
            <Check className="size-3" />
          ) : (
            <GitBranch className="size-3" />
          )}
        </motion.span>
      </AnimatePresence>
      {name}
      {sync}
      {prBadge}
    </Button>
  )
}

export { BranchChip, type PrState }
