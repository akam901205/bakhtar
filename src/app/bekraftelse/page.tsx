'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Bekraftelse() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-8 mb-12 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Tack för din förfrågan!
          </motion.h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Din förfrågan har mottagits och väntar nu på godkännande. Vi kommer att meddela dig när den har godkänts.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg text-left">
            <p className="text-sm text-blue-700">
              <strong>Viktigt:</strong> Vi behandlar din förfrågan så snart som möjligt. Om vi behöver ytterligare information kommer vi att kontakta dig via de kontaktuppgifter du angett.
            </p>
          </div>
          
          <p className="text-md text-gray-600 mb-8">
            Ett bekräftelsemail har skickats till din e-postadress med detaljer om din förfrågan.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out font-medium">
              Återgå till startsidan
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}