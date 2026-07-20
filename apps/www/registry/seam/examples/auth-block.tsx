"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { depth, fades, reduced, springs } from "@/lib/motion"
import { Button } from "@/registry/seam/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/seam/ui/card"
import { Field, FieldError, FieldLabel } from "@/registry/seam/ui/field"
import { Form } from "@/registry/seam/ui/form"
import { Input } from "@/registry/seam/ui/input"
import { OTPField } from "@/registry/seam/ui/otp-field"
import { Separator } from "@/registry/seam/ui/separator"

// The auth block: a sign-in card that steps into 2FA. Everything is the
// foundation composed — Card, Form/Field validation, an OTP second factor
// that shakes on a rejected code — and the step swap is motion-owned
// (AnimatePresence), so it rises with overlay depth and fades under
// reduced motion.
type Step = "credentials" | "code" | "done"

const COPY: Record<Step, { title: string; desc: (email: string) => string }> = {
  credentials: {
    title: "Sign in",
    desc: () => "Use your work email to continue.",
  },
  code: {
    title: "Check your phone",
    desc: (email) => `We sent a 6-digit code for ${email}.`,
  },
  done: { title: "Welcome back", desc: () => "Two factors, zero doubt." },
}

export default function AuthBlock() {
  const [step, setStep] = React.useState<Step>("credentials")
  const [email, setEmail] = React.useState("")
  const [invalid, setInvalid] = React.useState(false)
  const reduceMotion = useReducedMotion() ?? false

  const stepMotion = reduceMotion
    ? { ...reduced.fadeIn, transition: fades.normal }
    : { ...depth.overlay, transition: springs.surface }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{COPY[step].title}</CardTitle>
        <CardDescription>{COPY[step].desc(email)}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Always mounted so screen readers announce the final step. */}
        <span className="sr-only" aria-live="polite">
          {step === "done" ? `Signed in as ${email}.` : ""}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          {step === "credentials" && (
            <motion.div key="credentials" {...stepMotion}>
              <Form<{ email: string; password: string }>
                onFormSubmit={(values) => {
                  setEmail(values.email)
                  setStep("code")
                }}
              >
                <Field name="email">
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    required
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                  <FieldError match="valueMissing">
                    Enter your email.
                  </FieldError>
                  <FieldError match="typeMismatch">
                    That doesn&apos;t look like an email.
                  </FieldError>
                </Field>
                <Field name="password">
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    type="password"
                    required
                    minLength={8}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <FieldError match="valueMissing">
                    Enter your password.
                  </FieldError>
                  <FieldError match="tooShort">
                    At least 8 characters.
                  </FieldError>
                </Field>
                <Button type="submit" className="w-full">
                  Continue
                </Button>
                <div className="flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span className="text-muted-foreground text-xs">or</span>
                  <Separator className="flex-1" />
                </div>
                <Button type="button" variant="outline" className="w-full">
                  Continue with SSO
                </Button>
              </Form>
            </motion.div>
          )}

          {step === "code" && (
            <motion.div
              key="code"
              {...stepMotion}
              className="flex flex-col items-center gap-4"
            >
              {/* Uncontrolled: the step unmounts on change, so the code
                  resets for free. */}
              <OTPField
                length={6}
                invalid={invalid}
                onValueChange={() => setInvalid(false)}
                onValueComplete={(v: string) => {
                  if (v === "123456") setStep("done")
                  else setInvalid(true)
                }}
              />
              <p className="text-muted-foreground text-xs" aria-live="polite">
                {invalid
                  ? "That code didn't match — try again."
                  : "The demo code is 123456 — try a wrong one first."}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setInvalid(false)
                  setStep("credentials")
                }}
              >
                Use a different account
              </Button>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div
              key="done"
              {...stepMotion}
              className="flex flex-col items-center gap-4 py-4"
            >
              <p className="text-sm">
                Signed in as <strong>{email}</strong>.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setInvalid(false)
                  setStep("credentials")
                }}
              >
                Start over
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
