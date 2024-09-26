'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-6">
          <li><Link href="/sok-verksamhet" className="inline-block py-4 text-gray-600 hover:text-teal-600">Sök verksamhet</Link></li>
          <li><Link href="/skapa-forfragan" className="inline-block py-4 text-gray-600 hover:text-teal-600">Skapa förfrågan</Link></li>
          <li><Link href="/registrera-verksamhet" className="inline-block py-4 text-gray-600 hover:text-teal-600">Registrera verksamhet</Link></li>
          <li className="relative">
            <button 
              className="inline-block py-4 text-gray-600 hover:text-teal-600"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Om oss ▾
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-10">
                <li>
                  <Link 
                    href="/om-placeringsinfo" 
                    className="block px-4 py-2 text-gray-800 hover:bg-teal-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Om Placeringsinfo
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/villkor-och-upphovsratt" 
                    className="block px-4 py-2 text-gray-800 hover:bg-teal-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Villkor och Upphovsrätt
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/kontakta-oss" 
                    className="block px-4 py-2 text-gray-800 hover:bg-teal-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Kontakta oss
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;