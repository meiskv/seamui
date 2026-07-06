"use client"

import * as React from "react"

/**
 * Renders a live example alongside its source, matching the seamui docs
 * template. `code` is the exact registry source so docs never drift from
 * what ships.
 */
export function ComponentPreview({
  children,
  code,
}: {
  children: React.ReactNode
  code: string
}) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview")

  return (
    <div className="my-6 overflow-hidden rounded-xl border">
      <div className="flex items-center gap-1 border-b px-2 py-1.5">
        {(["preview", "code"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "rounded-md px-3 py-1 text-sm capitalize " +
              (tab === t
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:text-foreground")
            }
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "preview" ? (
        <div className="flex min-h-40 items-center justify-center p-10">
          {children}
        </div>
      ) : (
        <pre className="bg-card overflow-x-auto p-4 text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
