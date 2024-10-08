// File: app/admin/companies/page.tsx

import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import AdminCompaniesClient from '@/components/AdminCompaniesClient';

export default async function AdminCompaniesPage() {
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

  const companies = await prisma.company.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      createdAt: true,
      // Add more fields as needed
    },
  });

  return <AdminCompaniesClient initialCompanies={companies} />;
}