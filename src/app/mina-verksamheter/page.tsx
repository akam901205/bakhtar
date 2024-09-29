'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoInformationCircleOutline, IoSearchOutline } from 'react-icons/io5';

const MinaVerksamheterPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBusinesses = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
        return;
      }
      try {
        const response = await fetch('/api/businesses', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setBusinesses(data);
        } else {
          console.error('Failed to fetch businesses');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBusinesses();
  }, [router]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Verksamheter</h1>

        <nav className="flex mb-6" aria-label="Tabs">
          <Link 
            href="/mina-verksamheter"
            className="text-blue-600 border-b-2 border-blue-600 pb-2 mr-4 font-medium"
          >
            Mina verksamheter
          </Link>
          <Link 
            href="/registrera-verksamhets"
            className="text-gray-600 hover:text-gray-800 pb-2 mr-4"
          >
            Registrera verksamhet
          </Link>
        </nav>

        <nav className="text-sm mb-4">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-blue-600 hover:text-blue-800">Hem</Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/verksamheter" className="text-blue-600 hover:text-blue-800">Verksamheter</Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="text-gray-500">Mina verksamheter</li>
          </ol>
        </nav>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <IoInformationCircleOutline className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Nedan listas de verksamheter som finns kopplade till din användare. Om det är första gången du loggar in, vänligen klicka på &quot;Registrera verksamhet&quot; för att lägga till din verksamhet i vår databas.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="p-4">
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Sök i tabellen"
                className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Namn', 'Blockerad', 'Medlemskap', 'Förnyas', 'Senast ändrad', 'Ändra din verksamhet'].map((header) => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {businesses.map((business) => (
                    <tr key={business.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-blue-600">{business.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{business.blocked ? 'Ja' : 'Nej'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{business.membership}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{business.renewalDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{business.lastModified}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        <Link href={`/edit-business/${business.id}`}>Visa &amp; Redigera</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinaVerksamheterPage;