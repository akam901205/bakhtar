import { NextRequest, NextResponse } from 'next/server';
import userAuth from '@/lib/userAuth';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
  }

  try {
    const user = await userAuth.getSessionUser(token);
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const { unansweredRequests, connectedBusinesses } = await userAuth.getUserData(user.id);

    return NextResponse.json({
      success: true,
      user: { firstName: user.firstName, lastName: user.lastName },
      unansweredRequests,
      connectedBusinesses
    }, { status: 200 });
  } catch (error) {
    console.error('User data fetch error:', error);
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 });
  }
}