'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EventkalenderVerksamheterPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
        return;
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Eventkalender - Verksamheter</h1>

        <nav className="text-sm mb-6">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-blue-600 hover:text-blue-800">Hem</Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="text-gray-500">Eventkalender - Verksamheter</li>
          </ol>
        </nav>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Planerade onlineutbildningar</h2>
          <p className="mb-4">
            Under 2024 har vi planerat för flera utbildningstillfällen via teams. Vi kommer att fylla på med utbildningar och workshops allteftersom.
          </p>
          <p className="mb-4">
            Se nedan för aktuella tillfällen. Anmäl er genom att klicka på aktuellt datum och registrera er. Passar inte något av datumen så försöker vi självklart hitta ett annat tillfälle, kontakta sofia@placeringsinfo.se
          </p>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Presentation av Marknadsföringstjänsten - ökad synlighet, statistik, flera administratörer etc.</h3>
            <ul className="list-disc list-inside">
              <li>6/9 kl 10:00</li>
              <li>10/9 kl 13:00</li>
              <li>26/9 kl 10:00</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Genomgång av Placeringsinfos system - ändra info om er/era verksamheter, hantera förfrågningar, registrera ny verksamhet.</h3>
            <ul className="list-disc list-inside">
              <li>17/9 kl 14:00</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventkalenderVerksamheterPage;