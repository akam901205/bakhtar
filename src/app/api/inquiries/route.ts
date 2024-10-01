import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const approvedRequests = await prisma.request.findMany({
      where: {
        status: 'GODKÄND',
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    const formattedRequests = approvedRequests.map(request => ({
      id: request.id,
      createdAt: request.createdAt.toISOString(),
      business: request.user?.email || 'Anonym',
      municipality: request.kommun,
      status: request.status,
      lan: request.lan,
      interventionType: request.interventionType,
      desiredResponseDate: request.desiredResponseDate.toISOString(),
      clientGender: request.clientGender,
      clientAge: request.clientAge,
      description: request.description,
      clientNeeds: request.clientNeeds,
      // Add any other fields you want to include
    }));

    return NextResponse.json(formattedRequests);
  } catch (error) {
    console.error('Failed to fetch approved requests:', error);
    return NextResponse.json({ error: 'Failed to fetch approved requests' }, { status: 500 });
  }
}