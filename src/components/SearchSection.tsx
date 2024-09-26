'use client';

import { useState } from 'react';

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
  };

  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Sök verksamhet</h1>
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="flex">
            <input
              type="text"
              placeholder="Sök efter företag, bransch eller ort"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-4 rounded-l-lg text-gray-800"
            />
            <button type="submit" className="bg-green-500 text-white p-4 rounded-r-lg hover:bg-green-600">
              Sök
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchSection;