"use client"

import * as React from "react"

/**
 * Copy-to-clipboard with a self-resetting "copied" flag — the shared engine
 * behind every seamui copy affordance (code block, terminal block, branch
 * chip). It clears any pending reset before arming a new one (rapid re-clicks
 * never stack timers) and on unmount (no setState-after-unmount warning).
 *
 *   const { copied, copy } = useCopy()
 *   <Button onClick={() => copy(text)}>{copied ? "Copied" : "Copy"}</Button>
 *
 * `copy` resolves `true` when the write succeeded, `false` when the clipboard
 * is unavailable (e.g. an insecure context) so callers can react if they want.
 */
export function useCopy(resetAfter = 2000): {
  copied: boolean
  copy: (text: string) => Promise<boolean>
} {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  const copy = React.useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), resetAfter)
        return true
      } catch {
        // clipboard unavailable (insecure context) — silently no-op
        return false
      }
    },
    [resetAfter]
  )

  return { copied, copy }
}
