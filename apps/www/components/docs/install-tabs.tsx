"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/seam/ui/tabs"

import { CodeBlock } from "./code-block"

/**
 * Condensed install: one command visible at a time behind a seamui/shadcn
 * switch, each with a quick-copy button. Dogfoods the seam Tabs.
 */
export function InstallTabs({ name }: { name: string }) {
  return (
    <Tabs defaultValue="seamui" size="sm">
      <TabsList>
        <TabsTrigger value="seamui">seamui</TabsTrigger>
        <TabsTrigger value="shadcn">shadcn</TabsTrigger>
      </TabsList>
      <TabsContent value="seamui">
        <CodeBlock language="bash">{`bunx --bun @seamui/cli@latest add ${name}`}</CodeBlock>
      </TabsContent>
      <TabsContent value="shadcn">
        <CodeBlock language="bash">{`bunx --bun shadcn@latest add @seamui/${name}`}</CodeBlock>
      </TabsContent>
    </Tabs>
  )
}
