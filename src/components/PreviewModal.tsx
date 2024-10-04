import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Client {
  clientGender: string;
  clientAge: string;
}

interface FormData {
  lan: string;
  kommun: string;
  name: string;
  email: string;
  phone: string;
  mobile: string;
  isAnonymous: boolean;
  clients: Client[];
  description: string;
  clientNeeds: string;
  interventionType: string;
  desiredLocation: string;
  desiredStartDate: string;
  desiredResponseDate: string;
  sentToOthers: boolean;
}

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, formData }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Förhandsgranska förfrågan</h2>
          
          <div className="space-y-6">
            <PreviewSection title="Kontaktuppgifter">
              <PreviewItem label="Län" value={formData.lan} />
              <PreviewItem label="Kommun" value={formData.kommun} />
              <PreviewItem label="Namn" value={formData.name} />
              <PreviewItem label="E-post" value={formData.email} />
              <PreviewItem label="Telefon" value={formData.phone} />
              <PreviewItem label="Mobil" value={formData.mobile} />
              <PreviewItem label="Anonym" value={formData.isAnonymous ? 'Ja' : 'Nej'} />
            </PreviewSection>

            <PreviewSection title="Om klienten/brukaren">
              {formData.clients.map((client, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold text-gray-700">Klient {index + 1}</h4>
                  <PreviewItem label="Kön" value={client.clientGender || 'Ej angivet'} />
                  <PreviewItem label="Ålder" value={client.clientAge || 'Ej angivet'} />
                </div>
              ))}
              <PreviewItem label="Beskrivning" value={formData.description} />
              <PreviewItem label="Klientens behov" value={formData.clientNeeds} />
            </PreviewSection>

            <PreviewSection title="Om insatsen">
              <PreviewItem label="Typ av insats/lagrum" value={formData.interventionType} />
              <PreviewItem label="Önskad plats" value={formData.desiredLocation} />
              <PreviewItem label="Önskat startdatum" value={formData.desiredStartDate} />
              <PreviewItem label="Önskat svarsdatum" value={formData.desiredResponseDate} />
              <PreviewItem label="Skickat till andra" value={formData.sentToOthers ? 'Ja' : 'Nej'} />
            </PreviewSection>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Stäng
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const PreviewSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border-b border-gray-200 pb-4">
    <h3 className="font-semibold text-lg mb-3 text-gray-800">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const PreviewItem: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div className="flex">
    <span className="font-medium text-gray-700 w-1/3">{label}:</span>
    <span className="text-gray-900">{value?.toString() || 'Ej angivet'}</span>
  </div>
);

export default PreviewModal;