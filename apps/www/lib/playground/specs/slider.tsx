import { Slider } from "@/registry/seam/ui/slider"
import { attrs, imports } from "../codegen"
import { bool, num, type PlaygroundSpec } from "../types"

export const sliderSpec: PlaygroundSpec = {
  id: "slider",
  title: "Slider",
  group: "Forms",
  blurb: "The thumb swells when grabbed and ticks a haptic as the value lands.",
  controls: [
    {
      id: "value",
      label: "Value",
      group: "Slider",
      type: "number",
      as: "slider",
      min: 0,
      max: 100,
      step: 1,
      default: 50,
    },
    {
      id: "max",
      label: "Max",
      group: "Slider",
      type: "number",
      min: 10,
      max: 200,
      step: 10,
      default: 100,
    },
    {
      id: "step",
      label: "Step",
      group: "Slider",
      type: "number",
      min: 1,
      max: 25,
      step: 1,
      default: 1,
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
    const max = num(state, "max", 100)
    const value = Math.min(num(state, "value", 50), max)
    return (
      <div className="w-full max-w-xs">
        <Slider
          key={`${value}-${max}-${num(state, "step", 1)}`}
          defaultValue={value}
          max={max}
          step={num(state, "step", 1)}
          disabled={bool(state, "disabled")}
        />
      </div>
    )
  },

  code: (state) => {
    const max = num(state, "max", 100)
    const value = Math.min(num(state, "value", 50), max)
    const head = imports({ "@/components/ui/slider": ["Slider"] })
    const props = attrs([
      ["defaultValue", value],
      ["max", max],
      ["step", num(state, "step", 1)],
      ["disabled", bool(state, "disabled")],
    ])
    return `${head}\n\n<div className="w-full max-w-xs">\n  <Slider${props} />\n</div>\n`
  },
}
