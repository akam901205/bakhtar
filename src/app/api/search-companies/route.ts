import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('searchTerm') || '';
  const lan = searchParams.get('lan') || '';
  const kommun = searchParams.get('kommun') || '';
  const ageMin = parseInt(searchParams.get('ageMin') || '0');
  const ageMax = parseInt(searchParams.get('ageMax') || '100');
  const targetGroups = searchParams.get('targetGroups')?.split(',').filter(Boolean) || [];
  const services = searchParams.get('services')?.split(',').filter(Boolean) || [];

  console.log('Search params:', { query, lan, kommun, ageMin, ageMax, targetGroups, services });

  try {
    const companies = await prisma.company.findMany({
      where: {
        AND: [
          query ? {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          } : {},
          lan ? { locations: { some: { name: { equals: lan, mode: 'insensitive' } } } } : {},
          kommun ? { locations: { some: { name: { equals: kommun, mode: 'insensitive' } } } } : {},
          {
            AND: [
              { ageRangeMin: { lte: ageMax } },
              { ageRangeMax: { gte: ageMin } },
            ],
          },
          targetGroups.length > 0 ? { targetGroups: { some: { name: { in: targetGroups } } } } : {},
          services.length > 0 ? { services: { some: { name: { in: services } } } } : {},
        ],
      },
      include: {
        locations: true,
        contacts: true,
        targetGroups: true,
        services: true,
      },
    });

    console.log('Filtered companies:', companies.length);

    const formattedCompanies = companies.map(company => ({
      id: company.id,
      name: company.name,
      description: company.description,
      locations: company.locations.map(loc => loc.name),
      ageRange: `${company.ageRangeMin}-${company.ageRangeMax}`,
      targetGroups: company.targetGroups.map(tg => tg.name),
      services: company.services.map(s => s.name),
      contact: company.contacts[0] ? {
        name: company.contacts[0].name,
        phone: company.contacts[0].phone,
        email: company.contacts[0].email,
      } : null,
      logo: company.logo || '/default-logo.png',
    }));

    return NextResponse.json({ companies: formattedCompanies, totalCount: formattedCompanies.length });
  } catch (error) {
    console.error('Error searching companies:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}