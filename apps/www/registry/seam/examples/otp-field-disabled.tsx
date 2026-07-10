import { OTPField } from "@/registry/seam/ui/otp-field"

export default function OTPFieldDisabled() {
  return <OTPField length={6} defaultValue="123456" disabled />
}
