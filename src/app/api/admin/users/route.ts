import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: No session' }, { status: 401 });
  }
  if (!(session.user as any).isAdmin) {
    return NextResponse.json({ error: 'Forbidden: Not an admin' }, { status: 403 });
  }
  return null;
}

export async function GET(request: NextRequest) {
  const authResponse = await checkAuth();
  if (authResponse) return authResponse;

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        isAdmin: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('[API] Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authResponse = await checkAuth();
  if (authResponse) return authResponse;

  try {
    const userData = await request.json();
    const newUser = await prisma.user.create({
      data: userData,
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('[API] Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authResponse = await checkAuth();
  if (authResponse) return authResponse;

  try {
    const { id, ...updateData } = await request.json();
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('[API] Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authResponse = await checkAuth();
  if (authResponse) return authResponse;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[API] Error deleting user:', error);
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}