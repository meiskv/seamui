"use client"

import * as React from "react"
import { Bot, HelpCircle, ListTodo } from "lucide-react"

import { ContextMeter } from "@/registry/seam/ui/context-meter"
import { ModeOption, ModeSelector } from "@/registry/seam/ui/mode-selector"
import {
  ModelPicker,
  ModelPickerContent,
  ModelPickerItem,
  ModelPickerProvider,
  ModelPickerTrigger,
} from "@/registry/seam/ui/model-picker"

// The composed composer footer: mode left, model + context right — the row
// that sits under the composer's textarea in every agent product.
export default function ModelPickerFooter() {
  const [mode, setMode] = React.useState<string[]>(["agent"])

  return (
    <div className="bg-muted shadow-well flex w-full max-w-md items-center gap-2 rounded-lg squircle border border-border/60 p-2">
      <ModeSelector
        value={mode}
        onValueChange={setMode}
        className="shadow-none"
      >
        <ModeOption value="agent" aria-label="Agent mode">
          <Bot className="size-3.5" /> Agent
        </ModeOption>
        <ModeOption value="plan" aria-label="Plan mode">
          <ListTodo className="size-3.5" /> Plan
        </ModeOption>
        <ModeOption value="ask" aria-label="Ask mode">
          <HelpCircle className="size-3.5" /> Ask
        </ModeOption>
      </ModeSelector>
      <div className="ml-auto flex items-center gap-1.5">
        <ModelPicker defaultValue="fable-5">
          <ModelPickerTrigger />
          <ModelPickerContent>
            <ModelPickerProvider name="Anthropic">
              <ModelPickerItem value="fable-5">Fable 5</ModelPickerItem>
              <ModelPickerItem value="haiku-4-5">Haiku 4.5</ModelPickerItem>
            </ModelPickerProvider>
          </ModelPickerContent>
        </ModelPicker>
        <ContextMeter value={124_000} max={200_000} showValue />
      </div>
    </div>
  )
}
