import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!(session?.user as any)?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const companies = await prisma.company.findMany({
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
    return NextResponse.json(companies);
  } catch (error) {
    console.error('Error in GET /api/admin/companies:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session?.user as any)?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await request.json();
    const newCompany = await prisma.company.create({
      data: {
        name: data.name,
        description: data.description,
        ageRangeMin: data.ageRangeMin,
        ageRangeMax: data.ageRangeMax,
        logo: data.logo,
        contacts: {
          create: data.contacts,
        },
        locations: {
          connect: data.locations.map((id: number) => ({ id })),
        },
        services: {
          connect: data.services.map((id: number) => ({ id })),
        },
        targetGroups: {
          connect: data.targetGroups.map((id: number) => ({ id })),
        },
      },
      include: {
        contacts: true,
        locations: true,
        services: true,
        targetGroups: true,
      },
    });
    return NextResponse.json(newCompany);
  } catch (error) {
    console.error('Error in POST /api/admin/companies:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session?.user as any)?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await request.json();
    const updatedCompany = await prisma.company.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        ageRangeMin: data.ageRangeMin,
        ageRangeMax: data.ageRangeMax,
        logo: data.logo,
        contacts: {
          deleteMany: {},
          create: data.contacts,
        },
        locations: {
          set: data.locations.map((id: number) => ({ id })),
        },
        services: {
          set: data.services.map((id: number) => ({ id })),
        },
        targetGroups: {
          set: data.targetGroups.map((id: number) => ({ id })),
        },
      },
      include: {
        contacts: true,
        locations: true,
        services: true,
        targetGroups: true,
      },
    });
    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error('Error in PUT /api/admin/companies:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
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
  } catch (error) {
    console.error('Error in DELETE /api/admin/companies:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}