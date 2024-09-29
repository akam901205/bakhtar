import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function GET(request: Request) {
  console.log('[API] Admin status check requested');
 
  const token = request.headers.get('Cookie')?.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  if (!token) {
    console.log('[API] No token found in cookies');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as { userId: number; email: string; isAdmin: boolean };
    console.log('[API] Token decoded:', JSON.stringify(decoded));
   
    if (!decoded.isAdmin) {
      console.log('[API] User is not admin');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
   
    console.log('[API] Admin status confirmed');
    return NextResponse.json({ message: 'Authorized' });
  } catch (error) {
    console.error('[API] Error verifying token:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}