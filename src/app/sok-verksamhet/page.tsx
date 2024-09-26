'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SokVerksamhet() {
  const [selectedLan, setSelectedLan] = useState('');
  const [ageRange, setAgeRange] = useState({ min: 0, max: 100 });
  const [targetGroups, setTargetGroups] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTargetGroupChange = (group) => {
    setTargetGroups(prev => 
      prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
    );
  };

  const handleServiceChange = (service) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sök verksamheter
        </motion.h1>
        <p className="mb-12 text-center text-gray-600 max-w-2xl mx-auto">
          Placeringsinfo.se erbjuder alla verksamheter inom SoL, LSS, LRV, LPT, LVM och LVU att finnas med i söktjänsten kostnadsfritt.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-700">Sökkriterier</h2>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="lan">
                  Var söker du verksamheter?
                </label>
                <select
                  id="lan"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={selectedLan}
                  onChange={(e) => setSelectedLan(e.target.value)}
                >
                  <option value="">Välj län</option>
                  {/* Add län options here */}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Ålder på klienten
                </label>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    className="w-1/2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Min ålder"
                    value={ageRange.min}
                    onChange={(e) => setAgeRange({ ...ageRange, min: parseInt(e.target.value) })}
                  />
                  <input
                    type="number"
                    className="w-1/2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Max ålder"
                    value={ageRange.max}
                    onChange={(e) => setAgeRange({ ...ageRange, max: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-gray-700">Målgrupp</h3>
                <div className="space-y-2">
                  {['Kvinnor/flickor', 'Män/pojkar', 'Enbart flickor/kvinnor', 'Enbart pojkar/män', 'Förälder-barn'].map((group) => (
                    <motion.div 
                      key={group} 
                      className="flex items-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="checkbox"
                        id={group}
                        checked={targetGroups.includes(group)}
                        onChange={() => handleTargetGroupChange(group)}
                        className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                      />
                      <label htmlFor={group} className="ml-2 text-gray-700">{group}</label>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-700">Välj insats/lagrum</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-4">
                {[
                  'Konsulentstödd familjehemsvård - SoL 7.1.5',
                  'Hem begr. tid av dygn - SOL 7.1.4',
                  'Hem heldygnsv. - SOL 7.1.3',
                  'HVB-hem- SOL 7.1.1',
                  'LSS 9: 6p.',
                  'LSS 9: 7p.',
                  'LSS 9: 8p.',
                  'LSS 9: 9p.',
                  'LSS 9: 10p.',
                  'Skyddat boende Sol 7.1.1',
                  'Stödboende-SOL 7.1.1',
                  'Stödboende(Vuxna)',
                  'Särskilt boende - SOL 7.1.2',
                  'Öppenvård'
                ].map((service) => (
                  <motion.div 
                    key={service} 
                    className="flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="checkbox"
                      id={service}
                      checked={selectedServices.includes(service)}
                      onChange={() => handleServiceChange(service)}
                      className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor={service} className="ml-2 text-gray-700">{service}</label>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sök efter specifik verksamhet</h2>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Ange verksamhetsnamn"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <motion.button
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out w-full md:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Implement search functionality here
              console.log('Search criteria:', { selectedLan, ageRange, targetGroups, selectedServices, searchTerm });
            }}
          >
            Sök verksamheter
          </motion.button>
        </div>
      </div>
    </div>
  );
}