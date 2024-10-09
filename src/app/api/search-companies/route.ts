import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('searchTerm') || '';
    const ageMin = parseInt(searchParams.get('ageMin') || '0');
    const ageMax = parseInt(searchParams.get('ageMax') || '100');

    console.log('Search params:', { query, ageMin, ageMax });

    const companies = await prisma.company.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query } },
              { description: { contains: query } },
            ],
          },
          {
            ageRangeMin: { lte: ageMax },
            ageRangeMax: { gte: ageMin },
          },
        ],
      },
    });

    console.log('Found companies:', companies.length);

    const formattedCompanies = companies.map(company => ({
      id: company.id,
      name: company.name,
      description: company.description,
      ageRange: `${company.ageRangeMin}-${company.ageRangeMax}`,
      logo: company.logo || '/default-logo.png',
      email: company.email,
    }));

    return NextResponse.json({ companies: formattedCompanies, totalCount: formattedCompanies.length });
  } catch (error) {
    console.error('Detailed error in GET /api/search-companies:', error);
    return NextResponse.json({
      error: 'Internal Server Error',
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}