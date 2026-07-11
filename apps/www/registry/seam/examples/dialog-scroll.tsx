import { Button } from "@/registry/seam/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/registry/seam/ui/dialog"

export default function DialogScroll() {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline">Terms of Service</Button>}
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please review the terms below before continuing.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto text-muted-foreground text-sm">
          <div className="grid gap-3 pr-1">
            <p>
              By accessing this service you agree to be bound by these terms. If
              you do not agree with any part of them, you may not use the
              service. We may update these terms from time to time, and
              continued use constitutes acceptance of the revised terms.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activity that occurs under your
              account. Notify us immediately of any unauthorized use.
            </p>
            <p>
              The service is provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis. We make no warranties, expressed or
              implied, regarding the reliability, accuracy, or availability of
              the service.
            </p>
            <p>
              You agree not to misuse the service, including by attempting to
              access it using a method other than the interface and instructions
              we provide, or by interfering with its normal operation.
            </p>
            <p>
              All content, trademarks, and data on this service are the property
              of their respective owners. Nothing in these terms grants you any
              right to use them without prior written permission.
            </p>
            <p>
              To the fullest extent permitted by law, we shall not be liable for
              any indirect, incidental, or consequential damages arising out of
              your use of, or inability to use, the service.
            </p>
            <p>
              These terms are governed by the laws of the jurisdiction in which
              we operate, without regard to conflict-of-law principles. Any
              disputes shall be resolved in the courts of that jurisdiction.
            </p>
            <p>
              If any provision of these terms is found to be unenforceable, the
              remaining provisions will continue in full force and effect.
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button>Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
