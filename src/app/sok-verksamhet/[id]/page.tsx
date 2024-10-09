'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type VerksamhetDetail = {
  id: string;
  name: string;
  description: string;
  logo: string;
  contacts: Array<{ name: string; role: string; phone: string; email: string }>;
  address: string;
  criteria: {
    age: string;
    targetGroups: string[];
    services: string[];
    locations: string[];
  };
};

export default function VerksamhetDetailPage() {
  const { id } = useParams();
  const [verksamhet, setVerksamhet] = useState<VerksamhetDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVerksamhetDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/companies/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch company details');
        }
        const data = await response.json();
        setVerksamhet(data);
      } catch (error) {
        console.error('Error fetching company details:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchVerksamhetDetail();
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!verksamhet) {
    return <div>Company not found</div>;
  }
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link href="/sok-verksamhet/resultat" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Tillbaka till sökresultat
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <img src={verksamhet.logo} alt={verksamhet.name} className="w-16 h-16 mr-4" />
            <h1 className="text-3xl font-bold text-gray-800">{verksamhet.name}</h1>
          </div>
          
          <p className="text-gray-600 mb-6">{verksamhet.description}</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Kontakter</h2>
          {verksamhet.contacts.map((contact, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{contact.role}</h3>
              <p>{contact.name}</p>
              <p>{contact.phone}</p>
              <p className="text-blue-600">{contact.email}</p>
            </div>
          ))}
          
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Adress</h2>
          <p>{verksamhet.address}</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Sökkriterier</h2>
          <p><strong>Ålder:</strong> {verksamhet.criteria.age}</p>
          <p><strong>Målgrupp:</strong> {verksamhet.criteria.targetGroups.join(', ')}</p>
          <p><strong>Insats/Lagrum:</strong> {verksamhet.criteria.services.join(', ')}</p>
          <p><strong>Län:</strong> {verksamhet.criteria.locations.join(', ')}</p>
          
          {/* Add more sections as needed */}
        </div>
      </div>
    </div>
  );
}