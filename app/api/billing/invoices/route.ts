import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  // Mock implementation
  return NextResponse.json({
    data: [
      {
        id: 'inv_1',
        number: 'INV-001',
        amount_due: 2900,
        amount_paid: 2900,
        status: 'paid',
        created: Date.now() / 1000 - 86400 * 30,
        invoice_pdf: '#'
      }
    ]
  })
}

