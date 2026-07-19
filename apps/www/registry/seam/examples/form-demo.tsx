"use client"

import * as React from "react"

import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/seam/ui/field"
import { Form } from "@/registry/seam/ui/form"
import { Button } from "@/registry/seam/ui/button"

export default function FormDemo() {
  const [submitted, setSubmitted] = React.useState<string | null>(null)

  return (
    <Form
      className="w-72"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        setSubmitted(String(data.get("email")))
      }}
    >
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <FieldControl type="email" required placeholder="you@example.com" />
        <FieldError match="valueMissing">An email is required.</FieldError>
        <FieldError match="typeMismatch">Enter a valid email.</FieldError>
      </Field>
      <Button type="submit">Subscribe</Button>
      {submitted ? (
        <p className="text-muted-foreground text-sm">Subscribed {submitted}</p>
      ) : null}
    </Form>
  )
}
