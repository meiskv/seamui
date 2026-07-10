import { Button } from "@/registry/seam/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/seam/ui/card"
import { Input } from "@/registry/seam/ui/input"

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in to seamui</CardTitle>
        <CardDescription>
          Enter your email below to sign in to your account.
        </CardDescription>
        <CardAction>
          <Button variant="link" className="px-0">
            Sign up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-2.5">
        <Input type="email" placeholder="m@example.com" />
        <Input type="password" placeholder="Password" />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Sign in</Button>
        <Button variant="ghost" className="w-full">
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
