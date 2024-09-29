'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisteraVerksamhetPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
    koncern: '',
    membership: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your API
    console.log(formData);
    // After successful submission, redirect to Mina verksamheter
    // router.push('/mina-verksamheter');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Verksamheter</h1>

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
          <h2 className="text-2xl font-semibold mb-4">Registrera verksamhet</h2>
          <p className="mb-4 text-gray-600">Verksamheten är ett skyddat boende</p>

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
                {/* Add your business types here */}
              </select>
            </div>

            <h3 className="text-xl font-semibold mb-4">Uppgifter om verksamheten</h3>

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
              {/* Add more form fields here */}
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4">Medlemskap</h3>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Välj vilken typ av medlemskap som önskas
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border p-4 rounded">
                  <input
                    type="radio"
                    id="membership1"
                    name="membership"
                    value="kostnadsfri"
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="membership1">
                    Vi vill endast vara med i den kostnadsfria söktjänsten. Vad ingår?
                  </label>
                </div>
                <div className="border p-4 rounded">
                  <input
                    type="radio"
                    id="membership2"
                    name="membership"
                    value="bas12months"
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="membership2">
                    Vi vill gå med i Marknadsföringstjänsten bas i 12 månader. Vad ingår?
                  </label>
                </div>
                <div className="border p-4 rounded">
                  <input
                    type="radio"
                    id="membership3"
                    name="membership"
                    value="plus12months"
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="membership3">
                    Vi vill gå med i Marknadsföringstjänsten plus i 12 månader. Vad ingår?
                  </label>
                </div>
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