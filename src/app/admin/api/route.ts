import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import userAuth from '@/lib/userAuth';

export async function GET(request: Request) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await userAuth.getSessionUser(token);
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const businesses = await prisma.business.findMany({
      select: {
        id: true,
        name: true,
        adminId: true,
        createdAt: true,
      },
    });

    return NextResponse.json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}