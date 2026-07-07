"use client"

import * as React from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/seam/ui/tabs"

/**
 * Renders a live example alongside its source, matching the seamui docs
 * template. `code` is the exact registry source so docs never drift from
 * what ships. Dogfoods the seamui Tabs for the Preview/Code switch.
 */
export function ComponentPreview({
  children,
  code,
}: {
  children: React.ReactNode
  code: string
}) {
  return (
    <div className="squircle bg-card my-4 overflow-hidden rounded-xl border">
      <Tabs defaultValue="preview" size="sm">
        <div className="border-b px-2 py-1.5">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview">
          <div className="flex min-h-28 items-center justify-center p-6">
            {children}
          </div>
        </TabsContent>
        <TabsContent value="code">
          <pre className="overflow-x-auto p-4 text-[0.8125rem] leading-relaxed">
            <code>{code}</code>
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  )
}
