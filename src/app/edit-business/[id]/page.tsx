'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import lanKommuner from '@/lib/lanKommuner';

interface Business {
  id: string;
  isSkyddatBoende: boolean;
  type: string;
  name: string;
  companyName: string;
  orgNumber: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  county: string;
  municipality: string;
  phone: string;
  website: string;
  koncern: string;
}

export default function EditBusinessPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [business, setBusiness] = useState<Business | null>(null);
  const [kommuner, setKommuner] = useState<string[]>([]);

  useEffect(() => {
    const fetchBusiness = async () => {
      const response = await fetch(`/api/businesses/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setBusiness(data);
        if (data.county) {
          setKommuner(lanKommuner[data.county] || []);
        }
      } else {
        console.error('Failed to fetch business');
      }
    };

    if (status === "authenticated") {
      fetchBusiness();
    }
  }, [params.id, status]);

  useEffect(() => {
    if (business?.county) {
      setKommuner(lanKommuner[business.county] || []);
    }
  }, [business?.county]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setBusiness(prev => prev ? { ...prev, [name]: newValue } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;

    try {
      const response = await fetch(`/api/businesses/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(business),
      });

      if (response.ok) {
        router.push('/mina-verksamheter');
      } else {
        console.error('Failed to update business');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (status === "loading" || !business) {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push('/login');
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Redigera verksamhet</h1>

        <nav className="flex mb-6" aria-label="Tabs">
          <Link 
            href="/mina-verksamheter"
            className="text-gray-600 hover:text-gray-800 pb-2 mr-4"
          >
            Mina verksamheter
          </Link>
          <Link 
            href="#"
            className="text-blue-600 border-b-2 border-blue-600 pb-2 mr-4 font-medium"
          >
            Redigera verksamhet
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
            <li className="text-gray-500">Redigera verksamhet</li>
          </ol>
        </nav>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Redigera verksamhet</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="flex items-center text-gray-700 text-sm font-bold">
                <input
                  type="checkbox"
                  name="isSkyddatBoende"
                  checked={business.isSkyddatBoende}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Verksamheten är ett skyddat boende
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                Typ av verksamhet
              </label>
              <select
                id="type"
                name="type"
                value={business.type}
                onChange={handleInputChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Välj typ</option>
                <option value="SOL">SOL</option>
                <option value="LSS">LSS</option>
                <option value="Familjehem">Familjehem</option>
              </select>
            </div>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">Uppgifter om verksamheten</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Verksamhetens namn*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={business.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                  Företagsnamn*
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={business.companyName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orgNumber">
                  Org nummer*
                </label>
                <input
                  type="text"
                  id="orgNumber"
                  name="orgNumber"
                  value={business.orgNumber}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="streetAddress">
                  Gatuadress*
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={business.streetAddress}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">
                  Postnummer*
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={business.postalCode}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                  Ort*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={business.city}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="county">
                  Län*
                </label>
                <select
                  id="county"
                  name="county"
                  value={business.county}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Välj län</option>
                  {Object.keys(lanKommuner).map((lan) => (
                    <option key={lan} value={lan}>{lan}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="municipality">
                  Kommun*
                </label>
                <select
                  id="municipality"
                  name="municipality"
                  value={business.municipality}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  disabled={!business.county}
                >
                  <option value="">Välj kommun</option>
                  {kommuner.map((kommun) => (
                    <option key={kommun} value={kommun}>{kommun}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Telefon*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={business.phone}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
                  Hemsida*
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={business.website}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="koncern">
                  Ev koncern/kedja
                </label>
                <input
                  type="text"
                  id="koncern"
                  name="koncern"
                  value={business.koncern}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Uppdatera verksamhet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}