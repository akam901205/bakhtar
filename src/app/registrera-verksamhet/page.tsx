'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function RegistreraVerksamhet() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    phone: '',
    password: '',
    confirmPassword: '',
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

  return (
    <div className="bg-gray-50 min-h-screen py-12">
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
          className="bg-white rounded-lg shadow-lg p-8 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">
              Vi strävar efter att alla verksamheter i Sverige ska finnas med i ett samlat register för att underlätta för kommuner i sökandet av en vård- och behandlingsplats. Alla verksamheter kan kostnadsfritt lägga in information om verksamheten i vår databas.
            </p>
            <p className="text-sm text-gray-700 mb-2">
              Vi har sorterat upp verksamheterna så att kommuner kan söka på tex. Lagrum, ålder och län. Sökresultatet kan kommunen i nästa steg filtrera på bland annat kön, antal platser, behandling, typ av boende och många andra sök-kriterier som skapar förutsättningar för en bra placering.
            </p>
            <p className="text-sm text-gray-700 mb-2">
              I och med att nya tillståndsbeviljats och verksamheter läggs ner och köps upp så ber vi alla som använder vår tjänst att kontakta oss om det saknas verksamheter eller om informationen inte stämmer.
            </p>
            <p className="text-sm text-gray-700">
              Ni kan själva lägga in en verksamhet som saknas. Sök gärna i vår databas först för att se att verksamheten inte redan finns. Vi vill undvika dubbletter. Om er verksamhet redan finns i systemet och ni vill ändra information så kan ni bli administratör över verksamheten. Varje verksamhet har en knapp längst ner " Är du ägare av den här verksamheten: klicka här". Klicka på knappen och följ instruktionerna så får ni tillgång till verksamheten inom 24 timmar. Vi verifierar att ni är den "rätte" ägaren av verksamheten. Om verksamheten inte finns med i vår databas så uppmanar vi er att registrera er verksamhet nedan. För att registrera en verksamhet börjar du med att registrera en användare/administratör.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Registrera ny användare</h2>
          <p className="mb-4 text-blue-600 hover:underline cursor-pointer">
            Har du redan ett konto? Klicka här för att logga in
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Namn</label>
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
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-post</label>
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
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-gray-700 font-medium mb-2">Mobiltelefon</label>
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
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Telefon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Lösenord</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Bekräfta lösenord</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Registrera
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}