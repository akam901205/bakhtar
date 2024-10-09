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
    console.log('Retrieved companies:', JSON.stringify(companies, null, 2));
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
    console.log('Received data for new company:', JSON.stringify(data, null, 2));

    const newCompany = await prisma.company.create({
      data: {
        name: data.name,
        description: data.description,
        ageRangeMin: data.ageRangeMin,
        ageRangeMax: data.ageRangeMax,
        logo: data.logo,
        email: data.email,
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
    console.log('Created new company:', JSON.stringify(newCompany, null, 2));
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
    console.log('Received data for update:', JSON.stringify(data, null, 2));

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
    await prisma.contact.deleteMany({ where: { companyId: data.id } });
    if (data.contacts && data.contacts.length > 0) {
      await prisma.contact.createMany({
        data: data.contacts.map((contact: any) => ({
          ...contact,
          companyId: data.id,
        })),
      });
    }

    // Handle locations
    await prisma.companyToLocation.deleteMany({ where: { companyId: data.id } });
    if (data.locations && data.locations.length > 0) {
      for (const location of data.locations) {
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

    // Handle services
    await prisma.companyToService.deleteMany({ where: { companyId: data.id } });
    if (data.services && data.services.length > 0) {
      for (const service of data.services) {
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

    // Handle target groups
    await prisma.companyToTargetGroup.deleteMany({ where: { companyId: data.id } });
    if (data.targetGroups && data.targetGroups.length > 0) {
      for (const targetGroup of data.targetGroups) {
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

    console.log('Updated company data:', JSON.stringify(finalUpdatedCompany, null, 2));
    return NextResponse.json(finalUpdatedCompany);
  } catch (error) {
    console.error('Error in PUT /api/admin/companies:', error);
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
    
    console.log(`Deleting company with ID: ${id}`);

    // Delete related records first
    await prisma.contact.deleteMany({ where: { companyId: parseInt(id) } });
    await prisma.companyToLocation.deleteMany({ where: { companyId: parseInt(id) } });
    await prisma.companyToService.deleteMany({ where: { companyId: parseInt(id) } });
    await prisma.companyToTargetGroup.deleteMany({ where: { companyId: parseInt(id) } });

    // Now delete the company
    await prisma.company.delete({
      where: { id: parseInt(id) },
    });

    console.log(`Company with ID ${id} deleted successfully`);
    return NextResponse.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/admin/companies:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}