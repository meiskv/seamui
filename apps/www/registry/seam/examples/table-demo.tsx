import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/seam/ui/table"

const invoices = [
  {
    invoice: "INV-001",
    status: "Paid",
    method: "Credit Card",
    total: "$250.00",
  },
  { invoice: "INV-002", status: "Pending", method: "PayPal", total: "$150.00" },
  {
    invoice: "INV-003",
    status: "Unpaid",
    method: "Bank Transfer",
    total: "$350.00",
  },
  {
    invoice: "INV-004",
    status: "Paid",
    method: "Credit Card",
    total: "$450.00",
  },
]

export default function TableDemo() {
  return (
    <Table aria-label="Recent invoices">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((row) => (
          <TableRow key={row.invoice}>
            <TableCell className="font-medium">{row.invoice}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.method}</TableCell>
            <TableCell className="text-right tabular-nums">
              {row.total}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right tabular-nums">$1,200.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
