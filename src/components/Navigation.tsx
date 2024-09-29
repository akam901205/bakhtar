'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoChevronDownOutline } from 'react-icons/io5';

const Navigation = ({ isLoggedIn }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVerksamheterOpen, setIsVerksamheterOpen] = useState(false);
  const [isVaraTjansterOpen, setIsVaraTjansterOpen] = useState(false);
  const dropdownRef = useRef(null);
  const verksamheterRef = useRef(null);
  const varaTjansterRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (verksamheterRef.current && !verksamheterRef.current.contains(event.target)) {
        setIsVerksamheterOpen(false);
      }
      if (varaTjansterRef.current && !varaTjansterRef.current.contains(event.target)) {
        setIsVaraTjansterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (href) => pathname === href;

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
          {isLoggedIn ? (
            <>
              <li className="relative" ref={verksamheterRef}>
                <button
                  className={`inline-flex items-center py-4 text-gray-600 hover:text-teal-600 ${isActive('/verksamheter') ? 'text-teal-600 font-semibold' : ''}`}
                  onClick={() => setIsVerksamheterOpen(!isVerksamheterOpen)}
                >
                  Verksamheter
                  <IoChevronDownOutline className="ml-1" />
                </button>
                {isVerksamheterOpen && (
                  <ul className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-10">
                    <li>
                      <Link
                        href="/mina-verksamheter"
                        className="block px-4 py-2 text-gray-800 hover:bg-teal-50"
                        onClick={() => setIsVerksamheterOpen(false)}
                      >
                        Mina verksamheter
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/registrera-verksamhets"
                        className="block px-4 py-2 text-gray-800 hover:bg-teal-50"
                        onClick={() => setIsVerksamheterOpen(false)}
                      >
                        Registrera verksamhet
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link
                  href="/forfragningar"
                  className={`inline-block py-4 text-gray-600 hover:text-teal-600 ${isActive('/forfragningar') ? 'text-teal-600 font-semibold' : ''}`}
                >
                  Förfrågningar
                </Link>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
          <li className="relative" ref={varaTjansterRef}>
            <button
              className={`inline-flex items-center py-4 text-gray-600 hover:text-teal-600 ${isActive('/vara-tjanster') ? 'text-teal-600 font-semibold' : ''}`}
              onClick={() => setIsVaraTjansterOpen(!isVaraTjansterOpen)}
            >
              Våra tjänster
              <IoChevronDownOutline className="ml-1" />
            </button>
            {isVaraTjansterOpen && (
              <ul className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-10">
                <li>
                  <Link
                    href="/tjanster-for-verksamheter"
                    className="block px-4 py-2 text-gray-800 hover:bg-teal-50"
                    onClick={() => setIsVaraTjansterOpen(false)}
                  >
                    Tjänster för verksamheter
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="relative" ref={dropdownRef}>
            <button
              className="inline-flex items-center py-4 text-gray-600 hover:text-teal-600"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Om oss
              <IoChevronDownOutline className="ml-1" />
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-10">
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
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {isLoggedIn && (
            <li>
              <Link
                href="/eventkalender-verksamheter"
                className={`inline-block py-4 text-gray-600 hover:text-teal-600 ${isActive('/eventkalender-verksamheter') ? 'text-teal-600 font-semibold' : ''}`}
              >
                Eventkalender - Verksamheter
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;