import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const company = await prisma.company.findUnique({
      where: { id: parseInt(id) },
      include: {
        contacts: true,
        locations: {
          include: {
            location: true
          }
        },
        services: {
          include: {
            service: true
          }
        },
        targetGroups: {
          include: {
            targetGroup: true
          }
        },
      },
    });
    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }
    return NextResponse.json(company);
  } catch (error) {
    console.error('Error fetching company details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}