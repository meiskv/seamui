import { Switch } from "@/registry/seam/ui/switch"
import { attrs, imports } from "../codegen"
import { bool, str, type PlaygroundSpec } from "../types"

export const switchSpec: PlaygroundSpec = {
  id: "switch",
  title: "Switch",
  group: "Forms",
  blurb:
    "Press and hold: the thumb stretches toward the far side, then snaps across.",
  controls: [
    {
      id: "label",
      label: "Label",
      group: "Switch",
      type: "text",
      default: "Airplane mode",
    },
    {
      id: "checked",
      label: "Checked",
      group: "State",
      type: "boolean",
      default: true,
    },
    {
      id: "disabled",
      label: "Disabled",
      group: "State",
      type: "boolean",
      default: false,
    },
  ],

  render: (state) => {
    const label = str(state, "label", "Airplane mode")
    // `key` remounts on toggle so `defaultChecked` (uncontrolled) re-reads —
    // the playground is tuning the *initial* prop, not driving the control.
    const control = (
      <Switch
        key={String(bool(state, "checked", true))}
        defaultChecked={bool(state, "checked", true)}
        disabled={bool(state, "disabled")}
        aria-label={label ? undefined : "Toggle"}
      />
    )
    if (!label) return control
    return (
      <label className="flex items-center gap-2 text-sm">
        {control}
        {label}
      </label>
    )
  },

  code: (state) => {
    const label = str(state, "label", "Airplane mode")
    const head = imports({ "@/components/ui/switch": ["Switch"] })
    const props = attrs([
      ["defaultChecked", bool(state, "checked", true)],
      ["disabled", bool(state, "disabled")],
      ["aria-label", !label && "Toggle"],
    ])
    const control = `<Switch${props} />`
    if (!label) return `${head}\n\n${control}\n`
    return `${head}\n\n<label className="flex items-center gap-2 text-sm">\n  ${control}\n  ${label}\n</label>\n`
  },
}
