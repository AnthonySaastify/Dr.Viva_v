import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  return new NextResponse('ZIP export is no longer supported. Please use the CSV export option.', { status: 400 })
} 