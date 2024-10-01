import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    
    // Handle multiple clients
    const clientData = Object.keys(formData)
      .filter(key => key.startsWith('clientGender') || key.startsWith('clientAge'))
      .reduce((acc, key) => {
        const index = key.slice(-1);
        if (!acc[index]) acc[index] = {};
        if (key.startsWith('clientGender')) acc[index].gender = formData[key];
        if (key.startsWith('clientAge')) acc[index].age = parseInt(formData[key]);
        return acc;
      }, {});

    // Use the first client's data for the main fields
    const firstClient = Object.values(clientData)[0] || {};

    const newRequestData = {
      lan: formData.lan,
      kommun: formData.kommun,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      mobile: formData.mobile,
      isAnonymous: formData.isAnonymous,
      clientGender: firstClient.gender || '',
      clientAge: firstClient.age || 0,
      description: formData.description,
      clientNeeds: formData.clientNeeds,
      interventionType: formData.interventionType,
      desiredLocation: formData.desiredLocation,
      desiredStartDate: new Date(formData.desiredStartDate),
      desiredResponseDate: new Date(formData.desiredResponseDate),
      sentToOthers: formData.sentToOthers,
      status: 'VÄNTANDE_GODKÄNNANDE',
      userId: null,
      businessId: null, // Set to null, assuming it's nullable in your schema
    };

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