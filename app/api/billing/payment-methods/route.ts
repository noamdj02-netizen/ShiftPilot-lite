import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  // Mock implementation
  return NextResponse.json({
    data: [
      {
        id: 'pm_1',
        brand: 'visa',
        last4: '4242',
        exp_month: 12,
        exp_year: 2025
      }
    ]
  })
}

export async function POST(req: Request) {
  return NextResponse.json({ success: true })
}

