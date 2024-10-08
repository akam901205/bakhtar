import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!(session?.user as any)?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const companies = await prisma.company.findMany();
  return NextResponse.json(companies);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!(session?.user as any)?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();
  const newCompany = await prisma.company.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    },
  });
  return NextResponse.json(newCompany);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!(session?.user as any)?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();
  const updatedCompany = await prisma.company.update({
    where: { id: data.id },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    },
  });
  return NextResponse.json(updatedCompany);
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!(session?.user as any)?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'Company ID is required' }, { status: 400 });
  }

  await prisma.company.delete({
    where: { id: parseInt(id) },
  });
  return NextResponse.json({ message: 'Company deleted successfully' });
}