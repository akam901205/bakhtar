import { NextResponse } from 'next/server';
import userAuth from '@/lib/userAuth';

export async function POST(request: Request) {
  try {
    console.log('Registration request received');
    const { email, password, firstName, lastName } = await request.json();
    console.log('Request body:', { email, firstName, lastName }); // Don't log passwords

    if (!email || !password || !firstName || !lastName) {
      console.log('Missing required fields');
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const userId = await userAuth.register(email, password, firstName, lastName);
    console.log('User registered successfully:', userId);
    return NextResponse.json({ message: 'User registered successfully', userId }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Error registering user', error: String(error) }, { status: 500 });
  }
}