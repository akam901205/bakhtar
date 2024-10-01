import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    
    const newRequestData = {
      ...formData,
      status: 'VÄNTANDE_GODKÄNNANDE',
      userId: null, // Set to null as we're not requiring authentication
      businessId: 1, // You might need to adjust this based on your business logic
      clientAge: parseInt(formData.clientAge),
      desiredResponseDate: new Date(formData.desiredResponseDate),
      desiredStartDate: new Date(formData.desiredStartDate),
    };

    // Remove fields that are not in the Prisma schema
    delete newRequestData.agreeToDataStorage;

    const newRequest = await prisma.request.create({
      data: newRequestData,
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ error: 'Misslyckades att skapa förfrågan', details: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const approvedRequests = await prisma.request.findMany({
      where: { status: 'GODKÄND' },
    });
    return NextResponse.json(approvedRequests);
  } catch (error) {
    console.error('Misslyckades att hämta godkända förfrågningar:', error);
    return NextResponse.json({ error: 'Misslyckades att hämta förfrågningar' }, { status: 500 });
  }
}