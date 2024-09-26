'use client';

import React from 'react';
import SidebarNav from '../../components/SidebarNav';

const OmPlaceringsinfo = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-2/3 pr-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Om Placeringsinfo</h1>
           
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6 sm:p-10">
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Placeringsinfo.se drivs av Placeringsinformation Sverige AB och är ett företag som arbetar med att digitalisera socialtjänsten. Vårt kontor finns i Stockholm men vi verkar och utgår ifrån vår digitala plattform. Placeringsinfo lanserade första söktjänsten 2014 och är idag en välanvänd plattform som används av 160 kommuner.
                </p>
               
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Placeringsinfo har en egenutvecklad plattform som är i ständig rörelse. Vi utvecklar tjänster löpande efter våra kunders behov. Genom att digitalisera socialtjänsten skapas förutsättningar att arbeta kostnadseffektivt, rättssäkert och höja kvalitén på insatser och i kommunens egen organisation.
                </p>
               
                <p className="mb-6 text-gray-700 leading-relaxed">
                  När kommuner konkurrensutsätter individens behov med hela marknaden eller alla verksamheter på ett ramavtal som matchar individens behov kan kommunen hitta den bästa insatsen till det bästa priset. Placeringsinfo är en ledande aktör på marknaden som hela tiden ligger i framkant och driver den digitala utvecklingen av socialtjänsten framåt.
                </p>
               
                <blockquote className="border-l-4 border-teal-500 pl-4 italic my-8 text-gray-600">
                  "Vår vision är att tillgängliggöra information som bidrar till att människor får ett bra liv utifrån individuella förutsättningar (ökad livskvalité)"
                </blockquote>
               
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Vi är mycket stolta över att i nära samarbete med kommuner ha lyckats ta fram Sveriges genom tiderna bästa söktjänst för Socialtjänsten.
                </p>
               
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Kunder</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Placeringsinfos största kund är Adda Inköpscentral och STIC, Stockholms inköpscentral som är en del av Adda. Utöver Adda och STIC så har enskilda kommuner upphandlat olika delar av Placeringsinfos tjänster.
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 mt-8 md:mt-0">
            <SidebarNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OmPlaceringsinfo;