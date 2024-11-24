'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import lanKommuner from '@/lib/lanKommuner';
import PreviewModal from '../../components/PreviewModal'; // Ensure this path is correct


interface Client {
  clientGender: string;
  clientAge: string;
}

interface FormData {
  lan: string;
  kommun: string;
  name: string;
  email: string;
  phone: string;
  mobile: string;
  isAnonymous: boolean;
  clients: Client[];
  description: string;
  clientNeeds: string;
  interventionType: string;
  desiredLocation: string;
  desiredStartDate: string;
  desiredResponseDate: string;
  sentToOthers: boolean;
  agreeToDataStorage: boolean;
}

export default function SkapaForfragan() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    lan: '',
    kommun: '',
    name: '',
    email: '',
    phone: '',
    mobile: '',
    isAnonymous: false,
    clients: [{ clientGender: '', clientAge: '' }],
    description: '',
    clientNeeds: '',
    interventionType: '',
    desiredLocation: '',
    desiredStartDate: '',
    desiredResponseDate: '',
    sentToOthers: false,
    agreeToDataStorage: false,
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, clientIndex?: number) => {
    const { name, value, type } = e.target;
    setFormData(prevData => {
      if (clientIndex !== undefined && name.startsWith('client')) {
        const newClients = [...prevData.clients];
        newClients[clientIndex] = {
          ...newClients[clientIndex],
          [name.replace(`-${clientIndex}`, '')]: value
        };
        return {
          ...prevData,
          clients: newClients
        };
      }
      return {
        ...prevData,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      };
    });
  };

  const addClient = () => {
    setFormData(prevData => ({
      ...prevData,
      clients: [...prevData.clients, { clientGender: '', clientAge: '' }]
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          clientAge: parseInt(formData.clientAge),
          desiredStartDate: new Date(formData.desiredStartDate).toISOString(),
          desiredResponseDate: new Date(formData.desiredResponseDate).toISOString(),
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Request created successfully:', data);
        router.push('/bekraftelse');
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        alert(`Fel vid skapande av förfrågan: ${errorData.error || 'Okänt fel'}`);
      }
    } catch (error) {
      console.error('Client error:', error);
      alert('Ett fel uppstod vid anslutning till servern. Vänligen försök igen senare.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skapa förfrågan
        </motion.h1>
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-8 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Kontaktuppgifter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="lan" className="block text-gray-700 font-medium mb-2">Välj län *</label>
                <select
                  id="lan"
                  name="lan"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                  value={formData.lan}
                  onChange={handleChange}
                  required
                >
                  <option value="">Välj län</option>
                  {Object.keys(lanKommuner).map((lan) => (
                    <option key={lan} value={lan}>{lan}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="kommun" className="block text-gray-700 font-medium mb-2">Välj kommun *</label>
                <select
                  id="kommun"
                  name="kommun"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                  value={formData.kommun}
                  onChange={handleChange}
                  required
                  disabled={!formData.lan}
                >
                  <option value="">Välj kommun</option>
                  {formData.lan && lanKommuner[formData.lan].map((kommun) => (
                    <option key={kommun} value={kommun}>{kommun}</option>
                  ))}
                </select>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2 text-gray-700">Ansvarig handläggare</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Namn *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-post *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Telefon *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-gray-700 font-medium mb-2">Mobil *</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Jag vill vara anonym (dölj mina kontaktuppgifter för verksamheterna)</span>
              </label>
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Om klienten/brukaren</h2>
        {formData.clients.map((client, index) => (
          <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Klient {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Kön *</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`clientGender-${index}`}
                      value="Kvinna/Flicka"
                      checked={client.clientGender === "Kvinna/Flicka"}
                      onChange={(e) => handleChange(e, index)}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Kvinna/Flicka</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`clientGender-${index}`}
                      value="Man/Pojke"
                      checked={client.clientGender === "Man/Pojke"}
                      onChange={(e) => handleChange(e, index)}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Man/Pojke</span>
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor={`clientAge-${index}`} className="block text-gray-700 font-medium mb-2">Ålder på klienten *</label>
                <input
                  type="number"
                  id={`clientAge-${index}`}
                  name={`clientAge-${index}`}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                  value={client.clientAge}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </div>
            </div>
          </div>
        ))}

            <button
              type="button"
              className="mb-6 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out"
              onClick={addClient}
            >
              Lägg till ytterligare klient +
            </button>

            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Beskrivning</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="clientNeeds" className="block text-gray-700 font-medium mb-2">Klientens behov</label>
              <textarea
                id="clientNeeds"
                name="clientNeeds"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                value={formData.clientNeeds}
                onChange={handleChange}
              ></textarea>
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Om insatsen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="interventionType" className="block text-gray-700 font-medium mb-2">Typ av insats/lagrum *</label>
                <select
                  id="interventionType"
                  name="interventionType"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                  value={formData.interventionType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Välj typ</option>
                  <option value="SoL">SoL</option>
                  <option value="LSS">LSS</option>
                  <option value="LVM">LVM</option>
                  <option value="LVU">LVU</option>
                  <option value="LRV">LRV</option>
                  <option value="LPT">LPT</option>
                </select>
              </div>
              <div>
                <label htmlFor="desiredLocation" className="block text-gray-700 font-medium mb-2">Var önskas insatsen *</label>
                <input
                  type="text"
                  id="desiredLocation"
                  name="desiredLocation"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                  value={formData.desiredLocation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="desiredStartDate" className="block text-gray-700 font-medium mb-2">När önskas insats påbörjas *</label>
                <input
                  type="date"
                  id="desiredStartDate"
                  name="desiredStartDate"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                  value={formData.desiredStartDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="desiredResponseDate" className="block text-gray-700 font-medium mb-2">När önskas svar *</label>
              <input
                type="date"
                id="desiredResponseDate"
                name="desiredResponseDate"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                value={formData.desiredResponseDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="sentToOthers"
                  checked={formData.sentToOthers}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Har även skickat ut förfrågan via andra aktörer</span>
              </label>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeToDataStorage"
                  checked={formData.agreeToDataStorage}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2 text-gray-700">
                  Jag godkänner att Placeringsinfo sparar informationen i denna förfrågan upp till 18 månader. Placeringsinfo sparar informationen för att kunna arbeta med förfrågan och samla data för att vidareutveckla tjänsten.
                </span>
              </label>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out font-medium"
                onClick={() => setIsPreviewOpen(true)}
              >
                Förhandsgranska förfrågan
              </button>
              <motion.button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Skapa förfrågan
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        formData={formData}
      />
    </div>
  );
}