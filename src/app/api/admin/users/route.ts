import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';

async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  console.log("[API] Handling GET request for users");

  const token = request.cookies.get('token')?.value;
  if (!token) {
    console.log("[API] No token found");
    return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload || !(payload as any).isAdmin) {
    console.log("[API] User is not authorized or not an admin");
    return NextResponse.json({ error: 'Unauthorized: Not an admin' }, { status: 401 });
  }

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
  console.log("[API] Handling POST request for users");

  const token = request.cookies.get('token')?.value;
  if (!token) {
    console.log("[API] No token found");
    return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload || !(payload as any).isAdmin) {
    console.log("[API] User is not authorized or not an admin");
    return NextResponse.json({ error: 'Unauthorized: Not an admin' }, { status: 401 });
  }

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
  console.log("[API] Handling PUT request for users");

  const token = request.cookies.get('token')?.value;
  if (!token) {
    console.log("[API] No token found");
    return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload || !(payload as any).isAdmin) {
    console.log("[API] User is not authorized or not an admin");
    return NextResponse.json({ error: 'Unauthorized: Not an admin' }, { status: 401 });
  }

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
  console.log("[API] Handling DELETE request for users");

  const token = request.cookies.get('token')?.value;
  if (!token) {
    console.log("[API] No token found");
    return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload || !(payload as any).isAdmin) {
    console.log("[API] User is not authorized or not an admin");
    return NextResponse.json({ error: 'Unauthorized: Not an admin' }, { status: 401 });
  }

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