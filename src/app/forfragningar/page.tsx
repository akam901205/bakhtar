'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IoInformationCircleOutline, IoSearchOutline } from 'react-icons/io5';

interface Inquiry {
  id: string;
  createdAt: string;
  business: string;
  municipality: string;
  status: string;
  desiredResponseDate: string;
  clientGender: string;
  clientAge: number;
  description: string;
  clientNeeds: string;
  interventionType: string;
  lan: string;
}

const ForfragningarPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeTab, setActiveTab] = useState('ongoing');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
        return;
      }
      try {
        const response = await fetch('/api/inquiries', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data: Inquiry[] = await response.json();
          setInquiries(data);
        } else {
          console.error('Failed to fetch inquiries');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const handleShowDetails = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm mb-4">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-blue-600 hover:text-blue-800">Hem</Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="text-gray-500">Förfrågningar</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold mb-6 text-gray-800">Förfrågningar</h1>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <IoInformationCircleOutline className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Nedan listas de förfrågningar som har skickats till er/era verksamheter.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('ongoing')}
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'ongoing'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pågående förfrågningar
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'completed'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Avslutade förfrågningar
              </button>
            </nav>
          </div>

          <div className="p-4">
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Sök i tabellen"
                className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {inquiries.length === 0 ? (
              <p className="text-center text-gray-500 my-8">Du har inga förfrågningar ännu.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {['#', 'Verksamhet', 'Inkom', 'Kommun', 'Svar önskas', 'Brukare', 'Status', ''].map((header) => (
                        <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inquiries.map((inquiry) => (
                      <tr key={inquiry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`JÄR-${inquiry.id}`}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.business}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(inquiry.createdAt).toLocaleString('sv-SE')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.municipality}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(inquiry.desiredResponseDate).toLocaleString('sv-SE')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${inquiry.clientGender} ${inquiry.clientAge} år`}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleShowDetails(inquiry)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Visa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Visar <span className="font-medium">1</span> till <span className="font-medium">10</span> av{' '}
                  <span className="font-medium">97</span> resultat
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    {/* Add left chevron icon here */}
                  </button>
                  {/* Add page numbers here */}
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    {/* Add right chevron icon here */}
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {selectedInquiry && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Besvara förfrågan JÄR-{selectedInquiry.id}</h3>
                <p className="text-md text-gray-600 mb-6">
                  {new Date(selectedInquiry.desiredResponseDate) < new Date() 
                    ? "Svarstid har tyvärr passerats och det är inte längre möjligt att besvara denna förfrågan"
                    : "Här kan du besvara förfrågan"}
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-xl text-gray-800 mb-4">Förfrågan detaljer:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <p className="mb-2"><span className="font-semibold">Verksamhet:</span> {selectedInquiry.business}</p>
                      <p className="mb-2"><span className="font-semibold">Svar önskas senast:</span> {new Date(selectedInquiry.desiredResponseDate).toLocaleString('sv-SE')}</p>
                      <p className="mb-2"><span className="font-semibold">Klient:</span> {selectedInquiry.clientGender} {selectedInquiry.clientAge} år</p>
                      <p className="mb-2"><span className="font-semibold">Interventionstyp:</span> {selectedInquiry.interventionType}</p>
                    </div>
                    <div>
                      <p className="mb-2"><span className="font-semibold">Län:</span> {selectedInquiry.lan}</p>
                      <p className="mb-2"><span className="font-semibold">Kommun:</span> {selectedInquiry.municipality}</p>
                      <p className="mb-2"><span className="font-semibold">Status:</span> {selectedInquiry.status}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="mb-2"><span className="font-semibold">Beskrivning:</span></p>
                    <p className="bg-white p-3 rounded">{selectedInquiry.description}</p>
                  </div>
                  <div className="mt-4">
                    <p className="mb-2"><span className="font-semibold">Klientens behov:</span></p>
                    <p className="bg-white p-3 rounded">{selectedInquiry.clientNeeds}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => setSelectedInquiry(null)}
                  >
                    Stäng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForfragningarPage;