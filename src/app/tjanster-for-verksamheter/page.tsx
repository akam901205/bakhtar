'use client';
import React from 'react';
import Link from 'next/link';

const TjansterForVerksamheterPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Tjänster för verksamheter</h1>

        <nav className="text-sm mb-6">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-blue-600 hover:text-blue-800">Hem</Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/vara-tjanster" className="text-blue-600 hover:text-blue-800">Våra tjänster</Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="text-gray-500">Tjänster för verksamheter</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Söktjänster</h2>
            <p className="mb-4">Söktjänsten är kostnadsfri och passar verksamheter som har</p>
            <Link href="/las-mer-soktjanster" className="text-blue-600 hover:text-blue-800">Läs mer</Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Marknadsföringstjänsten Bas</h2>
            <p className="mb-4">Marknadsföringstjänsten Bas, är en tjänst som passar verksamheter som vill synas där kunderna finns! På Placeringsinfo.se görs sökningar av över 8000 besökare varje månad. En sida med detaljerad statistik över varje förfrågan ingår i tjänsten. Ni kan även ha flera administratörer kopplade till er verksamhetssida.</p>
            <p className="mb-4">Kostnad: 552 kr/månad</p>
            <Link href="/las-mer-marknadsforingstjansten-bas" className="text-blue-600 hover:text-blue-800">Läs mer</Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Marknadsföringstjänsten Plus</h2>
            <p className="mb-4">Marknadsföringstjänsten Plus, är till för verksamheter som inte bara vill synas där kommunerna söker efter lediga vård och behandlingsplatser utan även vill matchas med inkommande förfrågningar. En sida med detaljerad statistik över varje förfrågan ingår i tjänsten. Ni kan även ha flera administratörer kopplade till er verksamhetssida.</p>
            <p className="mb-4">Kostnad: 1 327 kr/månad</p>
            <Link href="/las-mer-marknadsforingstjansten-plus" className="text-blue-600 hover:text-blue-800">Läs mer</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TjansterForVerksamheterPage;