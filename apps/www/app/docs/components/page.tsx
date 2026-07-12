import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Components — seamui",
}

const COMPONENTS = [
  {
    name: "button",
    title: "Button",
    desc: "Pressable action with depth motion.",
  },
  { name: "toggle", title: "Toggle", desc: "Two-state button." },
  {
    name: "toggle-group",
    title: "Toggle Group",
    desc: "Keys rise from a shared well.",
  },
  { name: "input", title: "Input", desc: "Field-aware text input." },
  { name: "textarea", title: "Textarea", desc: "Auto-growing entry well." },
  { name: "avatar", title: "Avatar", desc: "Image with fade-in and fallback." },
  {
    name: "separator",
    title: "Separator",
    desc: "Divider in any orientation.",
  },
  { name: "switch", title: "Switch", desc: "Thumb springs between states." },
  { name: "checkbox", title: "Checkbox", desc: "Mark pops in with a spring." },
  {
    name: "radio-group",
    title: "Radio Group",
    desc: "Single-choice with spring dot.",
  },
  { name: "slider", title: "Slider", desc: "Thumb swells when grabbed." },
  { name: "tooltip", title: "Tooltip", desc: "Rises with overlay depth." },
  { name: "popover", title: "Popover", desc: "Floating panel, overlay depth." },
  {
    name: "preview-card",
    title: "Preview Card",
    desc: "Link preview on hover.",
  },
  { name: "dialog", title: "Dialog", desc: "Modal with top-of-stack depth." },
  {
    name: "alert-dialog",
    title: "Alert Dialog",
    desc: "Confirm a destructive action.",
  },
  { name: "drawer", title: "Drawer", desc: "Swipe-to-dismiss bottom sheet." },
  {
    name: "dropdown-menu",
    title: "Dropdown Menu",
    desc: "Actions menu, overlay depth.",
  },
  { name: "select", title: "Select", desc: "Choose one from a listbox." },
  { name: "combobox", title: "Combobox", desc: "Filterable option picker." },
  { name: "context-menu", title: "Context Menu", desc: "Right-click menu." },
  { name: "tabs", title: "Tabs", desc: "Indicator springs to active tab." },
  { name: "accordion", title: "Accordion", desc: "Height-animated sections." },
  {
    name: "collapsible",
    title: "Collapsible",
    desc: "Single expandable region.",
  },
  { name: "progress", title: "Progress", desc: "Eased task-completion fill." },
  { name: "meter", title: "Meter", desc: "Static measurement in a range." },
  {
    name: "number-field",
    title: "Number Field",
    desc: "Steppers with press depth.",
  },
  { name: "otp-field", title: "OTP Field", desc: "One-time-code input." },
  {
    name: "scroll-area",
    title: "Scroll Area",
    desc: "Fading custom scrollbar.",
  },
  { name: "toast", title: "Toast", desc: "Bouncy stacked notifications." },
  { name: "skeleton", title: "Skeleton", desc: "Pulsing loading placeholder." },
  {
    name: "spinner",
    title: "Spinner",
    desc: "Loading indicator, motion-safe.",
  },
  { name: "badge", title: "Badge", desc: "Miniature embossed status chip." },
  { name: "card", title: "Card", desc: "Raised surface with sections." },
  { name: "kbd", title: "Kbd", desc: "Shortcut as an embossed keycap." },
  {
    name: "table",
    title: "Table",
    desc: "Styled rows on a raised surface.",
  },
  {
    name: "data-table",
    title: "Data Table",
    desc: "TanStack grid: filter, page, edit.",
  },
  {
    name: "message",
    title: "Message",
    desc: "Chat row: user key, assistant prose.",
  },
  {
    name: "conversation",
    title: "Conversation",
    desc: "Stick-to-bottom chat viewport.",
  },
  {
    name: "composer",
    title: "Composer",
    desc: "Prompt well with send and stop.",
  },
  {
    name: "response",
    title: "Response",
    desc: "Streaming-safe markdown renderer.",
  },
  {
    name: "code-block",
    title: "Code Block",
    desc: "Highlighted code well with copy.",
  },
  { name: "tool", title: "Tool", desc: "Agentic step + reasoning disclosure." },
  {
    name: "typing-indicator",
    title: "Typing Indicator",
    desc: "Pre-first-token dots.",
  },
  {
    name: "suggestions",
    title: "Suggestions",
    desc: "Scrollable prompt chips.",
  },
  { name: "sources", title: "Sources", desc: "Grounding + inline citations." },
  {
    name: "chat-timeline",
    title: "Chat Timeline",
    desc: "Grouped, dated history.",
  },
  {
    name: "media-toggle",
    title: "Media Toggle",
    desc: "Mic/camera/screen call key.",
  },
  {
    name: "voice-visualizer",
    title: "Voice Visualizer",
    desc: "Agent-state audio dots.",
  },
  {
    name: "voice-avatar",
    title: "Voice Avatar",
    desc: "Avatar with a speaking halo.",
  },
  {
    name: "device-selector",
    title: "Device Selector",
    desc: "Mic/camera/output picker.",
  },
  {
    name: "voice-control-bar",
    title: "Voice Control Bar",
    desc: "Call pill that morphs into chat.",
  },
  {
    name: "agent-status",
    title: "Agent Status",
    desc: "The agent-state dot and chip.",
  },
  {
    name: "branch-chip",
    title: "Branch Chip",
    desc: "Press-to-copy branch pill.",
  },
  {
    name: "context-meter",
    title: "Context Meter",
    desc: "Context-window usage ring.",
  },
]

export default function ComponentsIndex() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        Beautifully animated components you own — Base UI primitives with a
        motion.dev depth layer.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {COMPONENTS.map((c) => (
          <li key={c.name}>
            <Link
              href={`/docs/components/${c.name}`}
              className="bg-card hover:shadow-raised block rounded-xl border p-4 shadow-resting"
            >
              <div className="font-medium">{c.title}</div>
              <div className="text-muted-foreground mt-1 text-sm">{c.desc}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
