'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ValkomenSida = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setUserName('Användare'); // Replace with actual user name
    }
  }, [router]);

  const chartData = [
    { name: 'Jan', förfrågningar: 65 },
    { name: 'Feb', förfrågningar: 59 },
    { name: 'Mar', förfrågningar: 80 },
    { name: 'Apr', förfrågningar: 81 },
    { name: 'Maj', förfrågningar: 56 },
    { name: 'Jun', förfrågningar: 55 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="bg-teal-600 px-6 py-4">
            <h1 className="text-3xl font-bold text-white">Välkommen till SOCIALGUIDEN.SE, {userName}!</h1>
          </div>
          <div className="p-6">
            <p className="text-xl text-gray-700 mb-6">Här är en översikt över ditt konto:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard title="Obesvarade förfrågningar" value="5" icon="📩" />
              <DashboardCard title="Aktiva placeringar" value="12" icon="🏠" />
              <DashboardCard title="Nya meddelanden" value="3" icon="💬" />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Förfrågningar senaste 6 månaderna</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="förfrågningar" stroke="#14b8a6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Snabblänkar</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <QuickLink href="/sok-verksamhet" text="Sök verksamhet" icon="🔍" />
                <QuickLink href="/skapa-forfragan" text="Skapa förfrågan" icon="✏️" />
                <QuickLink href="/min-profil" text="Min profil" icon="👤" />
                <QuickLink href="/rapporter" text="Rapporter" icon="📊" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nyheter</h2>
              <div className="space-y-6">
                <NewsItem
                  title="Socialchefsdagarna 2024"
                  date="2024-09-11"
                  content="Placeringsinfo arbetar aktivt för att marknadsföra vår databas och våra tjänster för kommunerna. Vi kommer att finnas på plats under Socialchefsdagarna på Kista mässan i oktober. Genom att nätverka och träffa 'nya' kommuner blir det fler och fler som använder vår databas för att hitta vård- och omsorgsboenden. Ska ni också ställa ut på mässan? Kom gärna förbi vår monter D:02."
                />
                <NewsItem
                  title="Senaste nytt"
                  date="2024-07-02"
                  content={`Vi har nu släppt flera nya funktioner och en helt ny startsida!
                    Ni kan nu se detaljerad data om varje förfrågan såsom antal inom/utom ram, lagrum, ålder, obesvarade/besvarade etc. Det är också möjligt att koppla flera administratörer till varje verksamhet. Allt detta ingår i våra Marknadsföringstjänster. Ni som redan har någon av våra betalande tjänster kommer självklart att kunna ta del av de nya funktionerna direkt!`}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Kommande webbinarier</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>10/9 tisdag kl. 13:00</li>
                  <li>26/9 torsdag kl. 10:00</li>
                  <li>17/10 torsdag kl. 10:00</li>
                </ul>
                <p className="mt-2 text-sm text-gray-600">Klicka på datum för registrering.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </motion.div>
);

const QuickLink = ({ href, text, icon }) => (
  <Link href={href} className="block">
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-4 bg-teal-50 hover:bg-teal-100 rounded-lg text-center text-teal-700 font-medium transition duration-150 ease-in-out"
    >
      <span className="text-2xl mb-2 block">{icon}</span>
      {text}
    </motion.div>
  </Link>
);

const NewsItem = ({ title, date, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
  >
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 mb-3">{date}</p>
    <p className="text-gray-600">{content}</p>
  </motion.div>
);

export default ValkomenSida;