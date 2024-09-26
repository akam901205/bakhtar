'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SkapaForfragan() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    clientAge: '',
    urgency: '',
    location: '',
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
          className="bg-white rounded-3xl shadow-2xl p-8 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Titel</label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ange en titel för din förfrågan"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Beskrivning</label>
              <textarea
                id="description"
                name="description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows={4}
                placeholder="Beskriv din förfrågan i detalj"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mb-6">
              <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Kategori</label>
              <select 
                id="category" 
                name="category"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Välj en kategori</option>
                <option value="sol">Socialtjänstlagen (SoL)</option>
                <option value="lss">Lagen om stöd och service (LSS)</option>
                <option value="lvm">Lagen om vård av missbrukare (LVM)</option>
                <option value="lvu">Lagen med särskilda bestämmelser om vård av unga (LVU)</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="clientAge" className="block text-gray-700 font-bold mb-2">Klientens ålder</label>
              <input
                type="number"
                id="clientAge"
                name="clientAge"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ange klientens ålder"
                value={formData.clientAge}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="urgency" className="block text-gray-700 font-bold mb-2">Brådskande</label>
              <select 
                id="urgency" 
                name="urgency"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={formData.urgency}
                onChange={handleChange}
              >
                <option value="">Välj brådskande nivå</option>
                <option value="low">Låg</option>
                <option value="medium">Medium</option>
                <option value="high">Hög</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Önskad plats</label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ange önskad plats för verksamheten"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out font-semibold text-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skicka förfrågan
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}