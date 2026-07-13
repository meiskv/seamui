import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ConnectorListDemo from "@/registry/seam/examples/connector-list-demo"
import ConnectorCardStates from "@/registry/seam/examples/connector-card-states"
import ConnectorCardTools from "@/registry/seam/examples/connector-card-tools"

export const metadata: Metadata = {
  title: "Connector Card — seamui",
  description:
    "Integration card with OAuth states, per-conversation enable switch, and a discovered-tools disclosure.",
}

export default function ConnectorCardDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Connector Card</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The connector directory pattern: each integration is a raised key with
        its OAuth state, a Connect/Reconnect action, the per-conversation enable
        switch once connected, and discovered tools one disclosure away.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Directory",
            component: <ConnectorListDemo />,
            code: exampleSource("connector-list-demo"),
          },
          {
            key: "states",
            title: "States",
            component: <ConnectorCardStates />,
            code: exampleSource("connector-card-states"),
          },
          {
            key: "tools",
            title: "Discovered tools",
            component: <ConnectorCardTools />,
            code: exampleSource("connector-card-tools"),
          },
        ]}
      />

      <Install name="connector-card" />

      <Notes>
        <li>
          Controlled and runtime-agnostic: <code>connection</code> (
          <code>connected</code> / <code>disconnected</code> /{" "}
          <code>needs-auth</code> / <code>error</code>) and <code>enabled</code>{" "}
          in; <code>onConnect</code> / <code>onDisconnect</code> /{" "}
          <code>onEnabledChange</code> out. Wire them to your OAuth flow and MCP
          client.
        </li>
        <li>
          The card is a raised key; the icon sits in a carved-in well on it; the
          switch (labeled &ldquo;Use in this conversation&rdquo;) and Connect
          key are foundation controls. <code>needs-auth</code> and{" "}
          <code>error</code> status text takes the one sanctioned hue.
        </li>
        <li>
          The tools disclosure reuses the composite-safe collapsible trigger;
          tool names render as debossed mono chips. Each card announces as a
          labeled group (&ldquo;GitHub: Needs re-authentication&rdquo;).
        </li>
      </Notes>
    </main>
  )
}
