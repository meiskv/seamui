export type NavItem = { title: string; href: string }
export type NavGroup = { title: string; items: NavItem[] }

const c = (slug: string, title: string): NavItem => ({
  title,
  href: `/docs/components/${slug}`,
})

export const NAV: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Overview", href: "/docs/components" },
      { title: "Motion", href: "/docs/motion" },
      { title: "Haptics", href: "/docs/haptics" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Building a chat app", href: "/docs/guides/chat" },
      { title: "Building a voice agent", href: "/docs/guides/voice" },
    ],
  },
  {
    title: "Forms",
    items: [
      c("button", "Button"),
      c("toggle", "Toggle"),
      c("toggle-group", "Toggle Group"),
      c("input", "Input"),
      c("textarea", "Textarea"),
      c("checkbox", "Checkbox"),
      c("radio-group", "Radio Group"),
      c("switch", "Switch"),
      c("slider", "Slider"),
      c("select", "Select"),
      c("combobox", "Combobox"),
      c("number-field", "Number Field"),
      c("otp-field", "OTP Field"),
    ],
  },
  {
    title: "Overlays",
    items: [
      c("dialog", "Dialog"),
      c("alert-dialog", "Alert Dialog"),
      c("drawer", "Drawer"),
      c("popover", "Popover"),
      c("tooltip", "Tooltip"),
      c("preview-card", "Preview Card"),
      c("dropdown-menu", "Dropdown Menu"),
      c("context-menu", "Context Menu"),
    ],
  },
  {
    title: "Layout",
    items: [
      c("tabs", "Tabs"),
      c("accordion", "Accordion"),
      c("collapsible", "Collapsible"),
      c("separator", "Separator"),
      c("scroll-area", "Scroll Area"),
    ],
  },
  {
    title: "Feedback",
    items: [
      c("progress", "Progress"),
      c("meter", "Meter"),
      c("toast", "Toast"),
      c("skeleton", "Skeleton"),
      c("spinner", "Spinner"),
    ],
  },
  {
    title: "Display",
    items: [
      c("avatar", "Avatar"),
      c("badge", "Badge"),
      c("card", "Card"),
      c("kbd", "Kbd"),
    ],
  },
  {
    title: "AI",
    items: [
      c("message", "Message"),
      c("conversation", "Conversation"),
      c("composer", "Composer"),
      c("response", "Response"),
      c("code-block", "Code Block"),
      c("tool", "Tool"),
      c("typing-indicator", "Typing Indicator"),
      c("suggestions", "Suggestions"),
      c("sources", "Sources"),
      c("chat-timeline", "Chat Timeline"),
    ],
  },
  {
    title: "Voice",
    items: [
      c("media-toggle", "Media Toggle"),
      c("device-selector", "Device Selector"),
      c("voice-avatar", "Voice Avatar"),
      c("voice-visualizer", "Voice Visualizer"),
      c("voice-control-bar", "Voice Control Bar"),
    ],
  },
]
