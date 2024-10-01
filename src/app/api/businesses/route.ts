// File: app/api/businesses/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
   
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = parseInt(session.user.id);
    const body = await request.json();
    console.log('Received business data:', body);
    // Validate required fields
    const requiredFields = ['name', 'type', 'companyName', 'orgNumber', 'streetAddress', 'postalCode', 'city', 'county', 'municipality', 'phone', 'website'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
    const business = await prisma.business.create({
      data: {
        name: body.name,
        type: body.type,
        companyName: body.companyName,
        orgNumber: body.orgNumber,
        streetAddress: body.streetAddress,
        postalCode: body.postalCode,
        city: body.city,
        county: body.county,
        municipality: body.municipality,
        phone: body.phone,
        website: body.website,
        adminId: userId,
        isSkyddatBoende: body.isSkyddatBoende || false,
        koncern: body.koncern || null,
      },
    });
    return NextResponse.json(business, { status: 201 });
  } catch (error) {
    console.error('Error creating business:', error);
    return NextResponse.json({ error: 'Error creating business', details: (error as Error).message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const businesses = await prisma.business.findMany();
    return NextResponse.json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return NextResponse.json({ error: 'Error fetching businesses', details: (error as Error).message }, { status: 500 });
  }
}