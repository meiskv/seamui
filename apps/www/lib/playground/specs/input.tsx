import { Input } from "@/registry/seam/ui/input"
import { attrs, imports } from "../codegen"
import { bool, str, type PlaygroundSpec } from "../types"

export const inputSpec: PlaygroundSpec = {
  id: "input",
  title: "Input",
  group: "Forms",
  blurb: "A debossed entry well — carved in, not raised. You type *into* it.",
  controls: [
    {
      id: "type",
      label: "Type",
      group: "Input",
      type: "enum",
      default: "text",
      options: [
        { value: "text", label: "Text" },
        { value: "email", label: "Email" },
        { value: "password", label: "Password" },
        { value: "search", label: "Search" },
      ],
    },
    {
      id: "placeholder",
      label: "Placeholder",
      group: "Input",
      type: "text",
      default: "m@example.com",
    },
    {
      id: "invalid",
      label: "Invalid",
      group: "State",
      type: "boolean",
      default: false,
    },
    {
      id: "disabled",
      label: "Disabled",
      group: "State",
      type: "boolean",
      default: false,
    },
  ],

  render: (state) => (
    <div className="w-full max-w-xs">
      <Input
        type={str(state, "type", "text")}
        placeholder={str(state, "placeholder", "m@example.com")}
        disabled={bool(state, "disabled")}
        // Base UI surfaces validity as a data attribute; the class hooks off it.
        data-invalid={bool(state, "invalid") ? "" : undefined}
        aria-invalid={bool(state, "invalid") || undefined}
      />
    </div>
  ),

  code: (state) => {
    const type = str(state, "type", "text")
    const invalid = bool(state, "invalid")
    const head = imports({ "@/components/ui/input": ["Input"] })
    const props = attrs([
      ["type", type !== "text" && type],
      ["placeholder", str(state, "placeholder", "m@example.com")],
      ["disabled", bool(state, "disabled")],
      ["aria-invalid", invalid],
    ])
    return `${head}\n\n<Input${props} />\n`
  },
}
