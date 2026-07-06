export type NavItem = { title: string; href: string }
export type NavGroup = { title: string; items: NavItem[] }

const c = (slug: string, title: string): NavItem => ({
  title,
  href: `/docs/components/${slug}`,
})

export const NAV: NavGroup[] = [
  {
    title: "Getting Started",
    items: [{ title: "Overview", href: "/docs/components" }],
  },
  {
    title: "Forms",
    items: [
      c("button", "Button"),
      c("toggle", "Toggle"),
      c("input", "Input"),
      c("checkbox", "Checkbox"),
      c("radio-group", "Radio Group"),
      c("switch", "Switch"),
      c("slider", "Slider"),
      c("select", "Select"),
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
    ],
  },
  {
    title: "Display",
    items: [c("avatar", "Avatar")],
  },
]
