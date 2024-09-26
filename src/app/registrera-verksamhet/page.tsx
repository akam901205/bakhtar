'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegistreraVerksamhet() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    orgNumber: '',
    address: '',
    industry: '',
    description: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Implement form submission logic here
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-6">Företagsinformation</h2>
            <div className="mb-6">
              <label htmlFor="companyName" className="block text-gray-700 font-bold mb-2">Företagsnamn</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ange företagets namn"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="orgNumber" className="block text-gray-700 font-bold mb-2">Organisationsnummer</label>
              <input
                type="text"
                id="orgNumber"
                name="orgNumber"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="XXXXXX-XXXX"
                value={formData.orgNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Adress</label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Företagets adress"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-6">Verksamhetsdetaljer</h2>
            <div className="mb-6">
              <label htmlFor="industry" className="block text-gray-700 font-bold mb-2">Bransch</label>
              <select 
                id="industry" 
                name="industry"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={formData.industry}
                onChange={handleChange}
                required
              >
                <option value="">Välj bransch</option>
                <option value="sol">Socialtjänstlagen (SoL)</option>
                <option value="lss">Lagen om stöd och service (LSS)</option>
                <option value="lvm">Lagen om vård av missbrukare (LVM)</option>
                <option value="lvu">Lagen med särskilda bestämmelser om vård av unga (LVU)</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Beskrivning av verksamheten</label>
              <textarea
                id="description"
                name="description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows={4}
                placeholder="Beskriv kort er verksamhet"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-6">Kontaktinformation</h2>
            <div className="mb-6">
              <label htmlFor="contactPerson" className="block text-gray-700 font-bold mb-2">Kontaktperson</label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ange namn på kontaktperson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">E-post</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="exempel@foretag.se"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Telefon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="07X-XXX XX XX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="website" className="block text-gray-700 font-bold mb-2">Webbplats (valfritt)</label>
              <input
                type="url"
                id="website"
                name="website"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="https://www.example.com"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Registrera verksamhet
        </motion.h1>
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-8 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className={`w-1/3 text-center ${step === stepNumber ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step === stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {stepNumber}
                  </div>
                  <div className="mt-2">Steg {stepNumber}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Föregående
                </motion.button>
              )}
              {step < 3 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Nästa
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  className="ml-auto bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Registrera
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}