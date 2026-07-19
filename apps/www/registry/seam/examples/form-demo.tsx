"use client"

import * as React from "react"

import { Button } from "@/registry/seam/ui/button"
import { Field, FieldError, FieldLabel } from "@/registry/seam/ui/field"
import { Form } from "@/registry/seam/ui/form"
import { Input } from "@/registry/seam/ui/input"

// Native constraints (required, type, minLength) drive validation; submitting
// with problems focuses the first invalid field and shakes its error in.
// `onFormSubmit` only fires once everything passes.
export default function FormDemo() {
  const [signedInAs, setSignedInAs] = React.useState<string | null>(null)

  return (
    <Form<{ email: string; password: string }>
      className="max-w-xs"
      onFormSubmit={(values) => setSignedInAs(values.email)}
    >
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input type="email" required placeholder="you@company.com" />
        <FieldError match="valueMissing">Enter your email.</FieldError>
        <FieldError match="typeMismatch">
          That doesn&apos;t look like an email.
        </FieldError>
      </Field>
      <Field name="password">
        <FieldLabel>Password</FieldLabel>
        <Input type="password" required minLength={8} placeholder="••••••••" />
        <FieldError match="valueMissing">Enter your password.</FieldError>
        <FieldError match="tooShort">At least 8 characters.</FieldError>
      </Field>
      <Button type="submit">Sign in</Button>
      {signedInAs && (
        <p className="text-muted-foreground text-sm">
          Signed in as {signedInAs}.
        </p>
      )}
    </Form>
  )
}
