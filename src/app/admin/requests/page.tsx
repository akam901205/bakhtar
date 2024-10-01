import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';
import { PrismaClient } from "@prisma/client";
import AdminRequestList from '../../../components/AdminRequestList';

const prisma = new PrismaClient();

export default async function AdminRequestsPage() {
  const session = await getServerSession(authOptions);
  console.log("Server-side session:", session);

  if (!session) {
    console.log("No session found");
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Obehörig åtkomst</h1>
        <p className="text-gray-600">Ingen session hittades. Vänligen logga in.</p>
      </div>
    );
  }

  if (!(session.user as any).isAdmin) {
    console.log("User is not an admin");
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Obehörig åtkomst</h1>
        <p className="text-gray-600">Du har inte administratörsbehörighet.</p>
      </div>
    );
  }

  const pendingRequests = await prisma.request.findMany({
    where: { status: 'VÄNTANDE' },
    include: { user: true },
  });

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard - Väntande förfrågningar</h1>
      <div className="bg-white rounded-lg shadow-md">
        <AdminRequestList requests={pendingRequests} />
      </div>
    </div>
  );
}