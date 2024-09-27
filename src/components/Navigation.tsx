'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap space-x-6">
          <li>
            <Link 
              href="/sok-verksamhet" 
              className={`inline-block py-4 text-gray-600 hover:text-teal-600 ${isActive('/sok-verksamhet') ? 'text-teal-600 font-semibold' : ''}`}
            >
              Sök verksamhet
            </Link>
          </li>
          <li>
            <Link 
              href="/skapa-forfragan" 
              className={`inline-block py-4 text-gray-600 hover:text-teal-600 ${isActive('/skapa-forfragan') ? 'text-teal-600 font-semibold' : ''}`}
            >
              Skapa förfrågan
            </Link>
          </li>
          <li>
            <Link 
              href="/registrera-verksamhet" 
              className={`inline-block py-4 text-gray-600 hover:text-teal-600 ${isActive('/registrera-verksamhet') ? 'text-teal-600 font-semibold' : ''}`}
            >
              Registrera verksamhet
            </Link>
          </li>
          <li className="relative" ref={dropdownRef}>
            <button
              className="inline-block py-4 text-gray-600 hover:text-teal-600"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              Om oss ▾
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-10" role="menu">
                {[
                  { href: '/om-placeringsinfo', text: 'Om Placeringsinfo' },
                  { href: '/villkor-och-upphovsratt', text: 'Villkor och Upphovsrätt' },
                  { href: '/kontakta-oss', text: 'Kontakta oss' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 text-gray-800 hover:bg-teal-50 ${isActive(item.href) ? 'bg-teal-50 font-semibold' : ''}`}
                      onClick={() => setIsDropdownOpen(false)}
                      role="menuitem"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;