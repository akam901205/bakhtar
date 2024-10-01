import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const business = await prisma.business.create({
      data: body,
    });
    return NextResponse.json(business, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating business' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const businesses = await prisma.business.findMany();
    return NextResponse.json(businesses);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching businesses' }, { status: 500 });
  }
}