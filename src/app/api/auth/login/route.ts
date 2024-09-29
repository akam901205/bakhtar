import { NextRequest, NextResponse } from 'next/server';
import userAuth from '@/lib/userAuth';
import { sign } from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const { email, password, remember } = await req.json();
  console.log('Login attempt received for email:', email);

  try {
    const user = await userAuth.login(email, password);
    console.log('User data from userAuth.login:', JSON.stringify(user, null, 2));

    if (user) {
      const token = sign(
        { userId: user.id, email: user.email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET as string,
        { expiresIn: remember ? '30d' : '1d' }
      );

      const responseData = {
        success: true,
        token,
        email: user.email,
        isAdmin: user.isAdmin
      };

      console.log('Response data being prepared:', JSON.stringify(responseData, null, 2));

      const response = NextResponse.json(responseData, { status: 200 });
     
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
        path: '/',
      });
     
      console.log('Response being sent:', JSON.stringify(response, null, 2));
      return response;
    } else {
      console.log('Login failed: Invalid credentials');
      return NextResponse.json({ success: false, message: 'Ogiltiga inloggningsuppgifter' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Ett fel inträffade' }, { status: 500 });
  }
}