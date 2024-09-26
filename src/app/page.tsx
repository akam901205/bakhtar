'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Implement search functionality here
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 bg-white">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-teal-50 to-cyan-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="relative container mx-auto px-4">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 text-center text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hitta rätt verksamhet för dina behov
          </motion.h1>
          <motion.p 
            className="text-xl text-center mb-12 max-w-2xl mx-auto text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Placeringsinfo.se erbjuder en omfattande söktjänst för verksamheter inom SoL, LSS, LRV, LPT, LVM och LVU.
          </motion.p>
          <motion.form 
            onSubmit={handleSearch}
            className="max-w-3xl mx-auto bg-white rounded-full shadow-lg p-2 flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <input
              type="text"
              placeholder="Sök efter verksamhet, ort eller tjänst"
              className="w-full p-4 rounded-full text-gray-800 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <motion.button 
              type="submit"
              className="bg-teal-500 text-white px-8 py-4 rounded-full hover:bg-teal-600 transition duration-300 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sök nu
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Våra tjänster</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Sök verksamhet", description: "Hitta rätt verksamhet baserat på dina specifika behov och krav.", icon: "🔍" },
              { title: "Registrera verksamhet", description: "Lägg till din verksamhet i vår databas och nå ut till fler potentiella klienter.", icon: "📝" },
              { title: "Skapa förfrågan", description: "Skicka en detaljerad förfrågan och få svar från lämpliga verksamheter.", icon: "✉️" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Vår påverkan</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "1000+", label: "Registrerade verksamheter" },
              { value: "50,000+", label: "Genomförda sökningar" },
              { value: "95%", label: "Nöjda användare" },
              { value: "24/7", label: "Tillgänglighet" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div 
                  className="text-4xl font-bold mb-2 text-teal-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 100 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Work */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Verksamhetsområden</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Socialtjänstlagen (SoL)",
              "Lagen om stöd och service till vissa funktionshindrade (LSS)",
              "Lagen om rättspsykiatrisk vård (LRV)",
              "Lagen om psykiatrisk tvångsvård (LPT)",
              "Lagen om vård av missbrukare i vissa fall (LVM)",
              "Lagen med särskilda bestämmelser om vård av unga (LVU)"
            ].map((area, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{area}</h3>
                <p className="text-gray-600 mb-4">Hitta verksamheter som arbetar inom detta område.</p>
                <Link href="/sok-verksamhet" className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center">
                  Utforska mer 
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-teal-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Redo att komma igång?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Registrera din verksamhet eller börja söka efter tjänster idag.
          </motion.p>
          <motion.div 
            className="space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="/registrera-verksamhet" className="bg-white text-teal-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 inline-block">
              Registrera verksamhet
            </Link>
            <Link href="/sok-verksamhet" className="bg-teal-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-teal-700 transition duration-300 inline-block">
              Sök verksamhet
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}