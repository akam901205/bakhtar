import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  console.log('Logout API called');

  try {
    // Clear the token cookie
    cookies().set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    });

    console.log('Cookie cleared successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing cookie:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}