'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

type SearchResult = {
  id: string;
  name: string;
  locations: string[];
  ageRange: string;
  targetGroups: string[];
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  logo: string;
};

export default function SearchResultsPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search-companies?${searchParams.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setResults(data.companies);
        setTotalResults(data.totalCount);
      } catch (error) {
        console.error('Error fetching search results:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Verksamheter som matchar din sökning: {totalResults}
          </h2>
          
          <div className="flex justify-between items-center mb-6">
            <Link href="/sok-verksamhet" className="text-blue-600 hover:underline">
              ← Ändra sökparametrar
            </Link>
            <select className="p-2 border border-gray-300 rounded-md">
              <option>Sortera</option>
              {/* Add sorting options here */}
            </select>
          </div>

          <div className="space-y-6">
            {results.map((result) => (
              <motion.div
                key={result.id}
                className="border border-gray-200 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start">
                  <img src={result.logo} alt={result.name} className="w-16 h-16 mr-4" />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800">{result.name}</h3>
                    <p className="text-gray-600">Finns i {result.locations.join(', ')}</p>
                    <p className="text-gray-600">Ålder: {result.ageRange}</p>
                    <p className="text-gray-600">Kön: {result.targetGroups.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <h4 className="font-semibold">Kontakt</h4>
                    <p>{result.contact.name}</p>
                    <p>{result.contact.phone}</p>
                    <p className="text-blue-600">{result.contact.email}</p>
                  </div>
                </div>
                <div className="mt-4 text-right">
                <Link href={`/sok-verksamhet/${result.id}`}>
  <motion.button
    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Läs mer →
  </motion.button>
</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}