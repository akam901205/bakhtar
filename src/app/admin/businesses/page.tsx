import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';
import { PrismaClient } from "@prisma/client";
import AdminBusinessList from '../../../components/AdminBusinessList';

const prisma = new PrismaClient();

export default async function AdminBusinessesPage() {
  const session = await getServerSession(authOptions);
 
  if (!session) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Obehörig åtkomst</h1>
        <p className="text-gray-600">Ingen session hittades. Vänligen logga in.</p>
      </div>
    );
  }
  if (!(session.user as any).isAdmin) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Obehörig åtkomst</h1>
        <p className="text-gray-600">Du har inte administratörsbehörighet.</p>
      </div>
    );
  }
  
  const businesses = await prisma.business.findMany({
    include: { admin: true },
  });

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <AdminBusinessList initialBusinesses={businesses} />
    </div>
  );
}