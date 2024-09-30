import { NextResponse } from 'next/server';

export async function GET() {
  console.log('[API] Admin businesses route accessed');
  return NextResponse.json({ message: 'Admin businesses API reached successfully' });
}