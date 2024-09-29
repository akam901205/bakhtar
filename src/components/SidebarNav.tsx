'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarNav: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string): boolean => pathname === path;

  return (
    <nav className="bg-white shadow-md rounded-lg overflow-hidden w-64">
      <ul className="divide-y divide-gray-200">
        <li>
          <Link
            href="/om-placeringsinfo"
            className={`block px-6 py-3 ${
              isActive('/om-placeringsinfo')
                ? 'bg-teal-500 text-white font-semibold'
                : 'text-gray-700 hover:bg-teal-50'
            }`}
          >
            Om Placeringsinfo
          </Link>
        </li>
        <li>
          <Link
            href="/villkor-och-upphovsratt"
            className={`block px-6 py-3 ${
              isActive('/villkor-och-upphovsratt')
                ? 'bg-teal-500 text-white font-semibold'
                : 'text-gray-700 hover:bg-teal-50'
            }`}
          >
            Villkor & Upphovsrätt
          </Link>
        </li>
        <li>
          <Link
            href="/kontakta-oss"
            className={`block px-6 py-3 ${
              isActive('/kontakta-oss')
                ? 'bg-teal-500 text-white font-semibold'
                : 'text-gray-700 hover:bg-teal-50'
            }`}
          >
            Kontakta oss
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;