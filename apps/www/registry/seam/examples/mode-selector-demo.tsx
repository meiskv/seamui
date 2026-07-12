import { Bot, HelpCircle, ListTodo } from "lucide-react"

import { ModeOption, ModeSelector } from "@/registry/seam/ui/mode-selector"

export default function ModeSelectorDemo() {
  return (
    <ModeSelector defaultValue={["agent"]}>
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
  )
}
