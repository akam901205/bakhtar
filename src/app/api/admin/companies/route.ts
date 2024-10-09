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
          create: data.locations.map((location: any) => ({
            location: {
              connectOrCreate: {
                where: { name: location.name },
                create: { name: location.name },
              }
            }
          })),
        },
        services: {
          create: data.services.map((service: any) => ({
            service: {
              connectOrCreate: {
                where: { name: service.name },
                create: { name: service.name },
              }
            }
          })),
        },
        targetGroups: {
          create: data.targetGroups.map((targetGroup: any) => ({
            targetGroup: {
              connectOrCreate: {
                where: { name: targetGroup.name },
                create: { name: targetGroup.name },
              }
            }
          })),
        },
      },
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
    console.log('Received data:', JSON.stringify(data, null, 2));

    // Update the company's basic information
    const updatedCompany = await prisma.company.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        ageRangeMin: data.ageRangeMin,
        ageRangeMax: data.ageRangeMax,
        logo: data.logo,
        email: data.email,
      },
    });

    // Handle contacts
    if (Array.isArray(data.contacts)) {
      await prisma.contact.deleteMany({ where: { companyId: data.id } });
      if (data.contacts.length > 0) {
        await prisma.contact.createMany({
          data: data.contacts.map((contact: any) => ({
            ...contact,
            companyId: data.id,
          })),
        });
      }
    }

    // Handle locations
    if (Array.isArray(data.locations)) {
      await prisma.companyToLocation.deleteMany({ where: { companyId: data.id } });
      for (const location of data.locations) {
        if (location.name) {
          const locationRecord = await prisma.location.upsert({
            where: { name: location.name },
            create: { name: location.name },
            update: {},
          });
          await prisma.companyToLocation.create({
            data: {
              companyId: data.id,
              locationId: locationRecord.id,
            },
          });
        }
      }
    }

    // Handle services (similar to locations)
    if (Array.isArray(data.services)) {
      await prisma.companyToService.deleteMany({ where: { companyId: data.id } });
      for (const service of data.services) {
        if (service.name) {
          const serviceRecord = await prisma.service.upsert({
            where: { name: service.name },
            create: { name: service.name },
            update: {},
          });
          await prisma.companyToService.create({
            data: {
              companyId: data.id,
              serviceId: serviceRecord.id,
            },
          });
        }
      }
    }

    // Handle target groups (similar to locations)
    if (Array.isArray(data.targetGroups)) {
      await prisma.companyToTargetGroup.deleteMany({ where: { companyId: data.id } });
      for (const targetGroup of data.targetGroups) {
        if (targetGroup.name) {
          const targetGroupRecord = await prisma.targetGroup.upsert({
            where: { name: targetGroup.name },
            create: { name: targetGroup.name },
            update: {},
          });
          await prisma.companyToTargetGroup.create({
            data: {
              companyId: data.id,
              targetGroupId: targetGroupRecord.id,
            },
          });
        }
      }
    }

    // Fetch the updated company with all its relations
    const finalUpdatedCompany = await prisma.company.findUnique({
      where: { id: data.id },
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

    return NextResponse.json(finalUpdatedCompany);
  } catch (error) {
    console.error('Detailed error in PUT /api/admin/companies:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error.message,
      stack: error.stack
    }, { status: 500 });
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