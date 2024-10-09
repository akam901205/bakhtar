import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import AdminCompaniesClient from '@/components/AdminCompaniesClient';

export default async function AdminCompaniesPage() {
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

  try {
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
    
    const formattedCompanies = companies.map(company => ({
      ...company,
      locations: company.locations.map(l => l.location),
      services: company.services.map(s => s.service),
      targetGroups: company.targetGroups.map(tg => tg.targetGroup),
    }));

    return <AdminCompaniesClient initialCompanies={formattedCompanies} />;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Ett fel uppstod</h1>
        <p className="text-gray-600">
          Det gick inte att hämta företag. Kontrollera att databasmodellen är korrekt konfigurerad. 
          Error: {(error as Error).message}
        </p>
      </div>
    );
  }
}