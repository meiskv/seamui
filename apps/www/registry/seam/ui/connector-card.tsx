"use client"

import type * as React from "react"
import { motion } from "motion/react"
import { ChevronDown, Plug } from "lucide-react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced, useReducedMotion } from "@/lib/motion"
import { Badge } from "./badge"
import { Button, buttonVariants } from "./button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible"
import { Switch } from "./switch"

// The Claude.ai connector directory as components: an integration card with
// connect/disconnect, OAuth states, the per-conversation enable switch, and
// a discovered-tools disclosure. No OAuth or MCP runtime coupling — state in,
// callbacks out.

type ConnectorState = "connected" | "disconnected" | "needs-auth" | "error"

const STATUS_TEXT: Record<ConnectorState, string> = {
  connected: "Connected",
  disconnected: "Not connected",
  "needs-auth": "Needs re-authentication",
  error: "Connection error",
}

function ConnectorCard({
  name,
  description,
  icon,
  connection = "disconnected",
  enabled,
  onEnabledChange,
  onConnect,
  onDisconnect,
  tools,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  name: React.ReactNode
  description?: React.ReactNode
  /** Logo / lucide icon; sits in a small carved well on the key. */
  icon?: React.ReactNode
  connection?: ConnectorState
  /** Per-conversation enablement — only rendered while connected. */
  enabled?: boolean
  onEnabledChange?: (enabled: boolean) => void
  onConnect?: () => void
  onDisconnect?: () => void
  /** Discovered tool names — renders the "N tools" disclosure. */
  tools?: string[]
}) {
  const reduceMotion = useReducedMotion()
  const attention = connection === "needs-auth" || connection === "error"

  return (
    <div
      data-slot="connector-card"
      data-connection={connection}
      role="group"
      aria-label={`${typeof name === "string" ? name : "Connector"}: ${STATUS_TEXT[connection]}`}
      className={cn(
        "bg-card text-card-foreground rounded-xl squircle border border-border/60 p-4 shadow-resting",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <div
          data-slot="connector-card-icon"
          aria-hidden
          className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-md squircle border border-border/60 shadow-well [&_svg:not([class*='size-'])]:size-4"
        >
          {icon ?? <Plug />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">{name}</div>
          <div
            data-slot="connector-card-status"
            className={cn(
              "truncate text-xs",
              attention ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {STATUS_TEXT[connection]}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {connection === "connected" ? (
            <>
              <Switch
                aria-label="Use in this conversation"
                checked={enabled}
                onCheckedChange={(checked) => onEnabledChange?.(checked)}
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground h-7 px-2 text-xs"
                onClick={() => onDisconnect?.()}
              >
                Disconnect
              </Button>
            </>
          ) : (
            <Button
              variant={attention ? "outline" : "secondary"}
              size="sm"
              className={cn(
                "h-7 px-2.5 text-xs",
                attention && "text-destructive"
              )}
              onClick={() => onConnect?.()}
            >
              {attention ? "Reconnect" : "Connect"}
            </Button>
          )}
        </div>
      </div>

      {description ? (
        <p className="text-muted-foreground mt-2 text-xs">{description}</p>
      ) : null}

      {tools && tools.length > 0 ? (
        <Collapsible data-slot="connector-card-tools" className="mt-2">
          <CollapsibleTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "group/tools text-muted-foreground h-6 gap-1 px-1.5 text-xs font-normal"
            )}
            render={
              <motion.button
                whileTap={reduceMotion ? reduced.pressed : depth.pressed}
                transition={reduceMotion ? fades.fast : springs.press}
              />
            }
          >
            {tools.length} {tools.length === 1 ? "tool" : "tools"}
            <ChevronDown
              aria-hidden
              className="size-3 transition-transform duration-200 group-data-[panel-open]/tools:rotate-180 motion-reduce:transition-none"
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-wrap gap-1 pt-1.5">
              {tools.map((tool) => (
                <Badge
                  key={tool}
                  variant="muted"
                  className="font-mono text-[10px]"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : null}
    </div>
  )
}

// The grid the cards sit in — layout only.
function ConnectorList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="connector-list"
      className={cn("grid w-full gap-3 sm:grid-cols-2", className)}
      {...props}
    />
  )
}

export { ConnectorCard, ConnectorList, type ConnectorState }
