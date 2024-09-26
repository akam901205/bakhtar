'use client';

import React from 'react';
import SidebarNav from '../../components/SidebarNav';

const VillkorOchUpphovsratt = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-2/3 pr-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Villkor & Upphovsrätt</h1>
            
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6 sm:p-10">
                <h2 className="text-2xl font-semibold mb-6 text-teal-600">Information och Ansvar</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Placeringsinfo.se publicerar information om lediga boenden och vårdplatser inom SoL, LSS, LRV, LPT, LVM och LVU. En stor del av informationen i vår databas är hämtad från Inspektionen för vård och omsorgs ("IVO") registerplattform. Vi arbetar aktivt för att hålla informationen uppdaterad och aktuell, men vi reserverar oss för att inaktuell information kan förekomma.
                </p>
                
                <h2 className="text-2xl font-semibold mb-6 text-teal-600">GDPR och Dataskydd</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Vi värnar om din integritet och följer GDPR (General Data Protection Regulation). Vi behandlar personuppgifter som namn, e-postadress, telefonnummer och titel för personer som är ansvariga för att ta emot och lämna förfrågningar, administratörer eller firmatecknare.
                </p>
                
                <h2 className="text-2xl font-semibold mb-6 text-teal-600">Dina Rättigheter</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Du har rätt att få information om och kontroll över dina personuppgifter. Detta inkluderar rätten att få felaktiga uppgifter rättade och, under vissa omständigheter, få dina uppgifter raderade.
                </p>
                
                <h2 className="text-2xl font-semibold mb-6 text-teal-600">Cookies</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Placeringsinfo.se använder cookies för att förbättra din användarupplevelse och för att ge dig tillgång till viss funktionalitet. Våra cookies sparar inte personlig information som namn och personuppgifter.
                </p>
                
                <h2 className="text-2xl font-semibold mb-6 text-teal-600">Upphovsrätt</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Placeringsinfo.se skyddas av upphovsrättslagen. Databasen ägs av Placeringsinformation Sverige AB och är skyddad enligt lag.
                </p>
                
                <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mt-8">
                  <p className="text-sm text-teal-700">
                    För fullständig information om våra villkor och vår hantering av personuppgifter, vänligen kontakta vår kundservice.
                  </p>
                </div>
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

export default VillkorOchUpphovsratt;