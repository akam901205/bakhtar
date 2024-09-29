'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import SidebarNav from '../../components/SidebarNav';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const KontaktaOss = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to your backend
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="lg:w-3/4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Kontakta oss</h1>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Form */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Namn</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Meddelande</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition duration-300 font-medium"
                    >
                      Skicka
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Kundtjänst</h2>
                  <p className="text-gray-600 mb-4">
                    Allmänna frågor från verksamheter och kommuner kan ställas till Placeringsinfos kundtjänst via mejl till{' '}
                    <a href="mailto:info@placeringsinfo.se" className="text-teal-600 hover:underline">info@placeringsinfo.se</a>{' '}
                    eller telefon på <a href="tel:010-17900000" className="text-teal-600 hover:underline">010-179 00 00</a> helgfria vardagar mellan kl 9.00-15.00 (Lunchstängt 12-13)
                  </p>
                  
                  <h3 className="font-semibold text-gray-800 mt-4 mb-2">Fakturafrågor</h3>
                  <p className="text-gray-600">
                    Hänvisas till{' '}
                    <a href="mailto:ekonomi@placeringsinfo.se" className="text-teal-600 hover:underline">ekonomi@placeringsinfo.se</a>
                  </p>
                  
                  <h3 className="font-semibold text-gray-800 mt-4 mb-2">Teknisk support för Addas kommuner</h3>
                  <p className="text-gray-600">
                    Frågor gällande inlogg och teknisk support - kontakta Placeringsinfo{' '}
                    <a href="tel:010-17900000" className="text-teal-600 hover:underline">010-179 00 00</a>{' '}
                    (tel: mån och ons 9-11), mejl:{' '}
                    <a href="mailto:adda@placeringsinfo.se" className="text-teal-600 hover:underline">adda@placeringsinfo.se</a>
                  </p>
                  
                  <h3 className="font-semibold text-gray-800 mt-4 mb-2">Ramavtalssupport för Addas kommuner</h3>
                  <p className="text-gray-600">
                    Frågor gällande avropsanmälan och ramavtalsvillkor och uppföljning m.m. - kontakta Inköpscentralens kundsupport:{' '}
                    <a href="tel:085250299696" className="text-teal-600 hover:underline">08 525 029 96</a>,{' '}
                    <a href="mailto:inkopscentralen@adda.se" className="text-teal-600 hover:underline">inkopscentralen@adda.se</a>
                  </p>
                </div>
              </div>
            </div>
          </main>
          
          <aside className="lg:w-1/4">
            <div className="sticky top-8">
              <SidebarNav />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default KontaktaOss;