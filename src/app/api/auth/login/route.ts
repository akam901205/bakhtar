import { NextRequest, NextResponse } from 'next/server';
import userAuth from '@/lib/userAuth';

export async function POST(req: NextRequest) {
  const { email, password, remember } = await req.json();
  try {
    const user = await userAuth.login(email, password);
    if (user) {
      const token = await userAuth.createSession(user.id, remember);
      const response = NextResponse.json({ success: true, token, email: user.email }, { status: 200 });
     
      // Update cookie settings
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // Change to 'lax' for better compatibility
        maxAge: remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
        path: '/',
      });
      return response;
    } else {
      return NextResponse.json({ success: false, message: 'Ogiltiga inloggningsuppgifter' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Ett fel inträffade' }, { status: 500 });
  }
}