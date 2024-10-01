'use client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import lanKommuner from '../../lib/lanKommuner';

interface FormData {
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

const RegisteraVerksamhetPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    isSkyddatBoende: false,
    type: '',
    name: '',
    companyName: '',
    orgNumber: '',
    streetAddress: '',
    postalCode: '',
    city: '',
    county: '',
    municipality: '',
    phone: '',
    website: '',
    koncern: ''
  });

  const [kommuner, setKommuner] = useState<string[]>([]);

  useEffect(() => {
    if (formData.county) {
      setKommuner(lanKommuner[formData.county] || []);
      setFormData(prevState => ({ ...prevState, municipality: '' }));
    }
  }, [formData.county]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/businesses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push('/mina-verksamheter');
      } else {
        console.error('Failed to create business');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Registrera verksamhet</h1>

        <nav className="flex mb-6" aria-label="Tabs">
          <Link 
            href="/mina-verksamheter"
            className="text-gray-600 hover:text-gray-800 pb-2 mr-4"
          >
            Mina verksamheter
          </Link>
          <Link 
            href="/registrera-verksamhets"
            className="text-blue-600 border-b-2 border-blue-600 pb-2 mr-4 font-medium"
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
            <li className="text-gray-500">Registrera verksamhet</li>
          </ol>
        </nav>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Registrera verksamhet</h2>
          <div className="mb-4">
            <input
              type="checkbox"
              id="isSkyddatBoende"
              name="isSkyddatBoende"
              checked={formData.isSkyddatBoende}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="isSkyddatBoende" className="text-gray-700">
              Verksamheten är ett skyddat boende
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                Typ av verksamhet
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
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
                  Verksamhetens namn* (enligt tillstånd om verksamheten är tillståndspliktig)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                  Företagsnamn* (tillståndshavare om verksamheten är tillståndspliktig)
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
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
                  value={formData.orgNumber}
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
                  value={formData.streetAddress}
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
                  value={formData.postalCode}
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
                  value={formData.city}
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
                  value={formData.county}
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
                  value={formData.municipality}
                  onChange={handleInputChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  disabled={!formData.county}
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
                  value={formData.phone}
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
                  value={formData.website}
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
                  value={formData.koncern}
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
                Skapa verksamhet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisteraVerksamhetPage;