"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

type DeviceKind = "audioinput" | "videoinput" | "audiooutput"
type Device = { deviceId: string; label: string }

const KIND_LABEL: Record<DeviceKind, string> = {
  audioinput: "Microphone",
  videoinput: "Camera",
  audiooutput: "Speaker",
}

/**
 * Owned device enumeration — lists the media devices of a kind and re-lists on
 * `devicechange`. Labels are empty until mic/camera permission is granted, so
 * unlabelled devices fall back to "Microphone 2"-style names. No dependency;
 * pass a `devices` prop to skip enumeration entirely.
 */
function useMediaDevices(kind: DeviceKind): Device[] {
  const [devices, setDevices] = React.useState<Device[]>([])

  React.useEffect(() => {
    const md =
      typeof navigator !== "undefined" ? navigator.mediaDevices : undefined
    if (!md?.enumerateDevices) return
    let stopped = false
    const load = async () => {
      try {
        const all = await md.enumerateDevices()
        if (stopped) return
        setDevices(
          all
            .filter((d) => d.kind === kind)
            .map((d, i) => ({
              deviceId: d.deviceId,
              label: d.label || `${KIND_LABEL[kind]} ${i + 1}`,
            }))
        )
      } catch {
        // enumeration unavailable — leave the list empty
      }
    }
    load()
    md.addEventListener("devicechange", load)
    return () => {
      stopped = true
      md.removeEventListener("devicechange", load)
    }
  }, [kind])

  return devices
}

type DeviceContextValue = {
  kind: DeviceKind
  devices: Device[]
  value?: string
  onValueChange: (v: string) => void
}
const DeviceContext = React.createContext<DeviceContextValue | null>(null)
function useDeviceContext() {
  const ctx = React.useContext(DeviceContext)
  if (!ctx) throw new Error("DeviceSelector parts must be used within <DeviceSelector>.")
  return ctx
}

// The device picker. Composes DropdownMenu — a radio group of devices with the
// active one checked. Controlled via `value`/`onValueChange`, or self-lists via
// the owned hook when no `devices` are passed.
function DeviceSelector({
  kind = "audioinput",
  devices: devicesProp,
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenu> & {
  kind?: DeviceKind
  devices?: Device[]
  value?: string
  defaultValue?: string
  onValueChange?: (deviceId: string) => void
}) {
  const enumerated = useMediaDevices(kind)
  const devices = devicesProp ?? enumerated
  const [internal, setInternal] = React.useState(defaultValue ?? "")
  const current = value ?? internal
  const set = (v: string) => {
    if (value === undefined) setInternal(v)
    onValueChange?.(v)
  }

  return (
    <DeviceContext.Provider value={{ kind, devices, value: current, onValueChange: set }}>
      <DropdownMenu {...props}>{children}</DropdownMenu>
    </DeviceContext.Provider>
  )
}

// A compact chevron key, sized to dock against a MediaToggle as a split control.
function DeviceSelectorTrigger({
  className,
  "aria-label": ariaLabel,
  ...props
}: React.ComponentProps<typeof DropdownMenuTrigger>) {
  const { kind } = useDeviceContext()
  return (
    <DropdownMenuTrigger
      data-slot="device-selector-trigger"
      aria-label={ariaLabel ?? `Select ${KIND_LABEL[kind].toLowerCase()}`}
      render={
        <Button
          variant="secondary"
          size="icon"
          className={cn("size-7 rounded-full", className)}
        />
      }
      {...props}
    >
      <ChevronDown className="size-4" />
    </DropdownMenuTrigger>
  )
}

function DeviceSelectorContent({
  className,
  label,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent> & { label?: React.ReactNode }) {
  const { kind, devices, value, onValueChange } = useDeviceContext()
  return (
    <DropdownMenuContent
      data-slot="device-selector-content"
      align="end"
      className={cn("min-w-56", className)}
      {...props}
    >
      <DropdownMenuLabel>{label ?? KIND_LABEL[kind]}</DropdownMenuLabel>
      {devices.length === 0 ? (
        <div className="text-muted-foreground px-2 py-1.5 text-sm">
          No devices found
        </div>
      ) : (
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {devices.map((d) => (
            <DropdownMenuRadioItem key={d.deviceId} value={d.deviceId}>
              {d.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      )}
    </DropdownMenuContent>
  )
}

export {
  DeviceSelector,
  DeviceSelectorTrigger,
  DeviceSelectorContent,
  useMediaDevices,
}
