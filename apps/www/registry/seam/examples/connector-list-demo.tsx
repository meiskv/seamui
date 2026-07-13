"use client"

import * as React from "react"
import { Calendar, FileText, Github, MessageSquare } from "lucide-react"

import {
  ConnectorCard,
  ConnectorList,
  type ConnectorState,
} from "@/registry/seam/ui/connector-card"

type Connector = {
  id: string
  name: string
  icon: React.ReactNode
  connection: ConnectorState
  enabled: boolean
}

const INITIAL: Connector[] = [
  {
    id: "github",
    name: "GitHub",
    icon: <Github />,
    connection: "connected",
    enabled: true,
  },
  {
    id: "slack",
    name: "Slack",
    icon: <MessageSquare />,
    connection: "connected",
    enabled: false,
  },
  {
    id: "notion",
    name: "Notion",
    icon: <FileText />,
    connection: "needs-auth",
    enabled: false,
  },
  {
    id: "calendar",
    name: "Google Calendar",
    icon: <Calendar />,
    connection: "disconnected",
    enabled: false,
  },
]

export default function ConnectorListDemo() {
  const [connectors, setConnectors] = React.useState(INITIAL)

  const update = (id: string, patch: Partial<Connector>) =>
    setConnectors((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)))

  return (
    <ConnectorList>
      {connectors.map((c) => (
        <ConnectorCard
          key={c.id}
          name={c.name}
          icon={c.icon}
          connection={c.connection}
          enabled={c.enabled}
          onEnabledChange={(enabled) => update(c.id, { enabled })}
          onConnect={() =>
            update(c.id, { connection: "connected", enabled: true })
          }
          onDisconnect={() =>
            update(c.id, { connection: "disconnected", enabled: false })
          }
        />
      ))}
    </ConnectorList>
  )
}
