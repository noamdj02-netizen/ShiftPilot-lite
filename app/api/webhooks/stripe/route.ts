import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Mock webhook handler
  return NextResponse.json({ received: true })
}

