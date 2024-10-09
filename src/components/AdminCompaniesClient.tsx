'use client';

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { AlertCircle, CheckCircle, Pencil, Trash2, Building, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface Location {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
}

interface TargetGroup {
  id: number;
  name: string;
}

interface Company {
  id: number;
  name: string;
  description: string;
  ageRangeMin: number;
  ageRangeMax: number;
  logo: string | null;
  contacts: Array<{ id: number; name: string; phone: string; email: string }>;
  locations: Array<{ id: number; name: string }>;
  services: Array<{ id: number; name: string }>;
  targetGroups: Array<{ id: number; name: string }>;
}

export default function AdminCompaniesClient({ initialCompanies }: { initialCompanies: Company[] }) {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAddingCompany, setIsAddingCompany] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/companies', { credentials: 'include' });
      if (!response.ok) {
        throw new Error(`Misslyckades med att hämta företag: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      setError(`Fel vid hämtning av företag: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (company: Company) => {
    setEditingCompany({ ...company });
  };

  const handleSave = async () => {
    if (!editingCompany) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/companies`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCompany),
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Misslyckades med att uppdatera företaget');
      }
      const updatedCompany = await response.json();
      setCompanies(companies.map(c => c.id === updatedCompany.id ? updatedCompany : c));
      setEditingCompany(null);
      setSuccessMessage('Företaget har uppdaterats');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError('Fel vid uppdatering av företag');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (companyId: number) => {
    if (window.confirm('Är du säker på att du vill ta bort detta företag?')) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/admin/companies?id=${companyId}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Misslyckades med att ta bort företaget');
        }
        setCompanies(companies.filter(c => c.id !== companyId));
        setSuccessMessage('Företaget har tagits bort');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setError('Fel vid borttagning av företag');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddCompany = () => {
    setIsAddingCompany(true);
    setEditingCompany({
      id: 0,
      name: '',
      description: '',
      ageRangeMin: 0,
      ageRangeMax: 100,
      logo: null,
      contacts: [],
      locations: [],
      services: [],
      targetGroups: [],
      createdAt: null
    });
  };

  const handleCreateCompany = async () => {
    if (!editingCompany) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCompany),
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Misslyckades med att skapa företaget');
      }
      const newCompany = await response.json();
      setCompanies([...companies, newCompany]);
      setIsAddingCompany(false);
      setEditingCompany(null);
      setSuccessMessage('Nytt företag har skapats');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError('Fel vid skapande av nytt företag');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateInput: string | Date | null): string => {
    if (!dateInput) return 'N/A';
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Hantera företag</h1>
      
      {successMessage && (
        <Alert className="mb-4 bg-green-100 border-green-400 text-green-700">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Lyckades</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-4 bg-red-100 border-red-400 text-red-700">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Fel</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-6 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Sök företag..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleAddCompany}>
          <Building className="mr-2 h-4 w-4" /> Lägg till nytt företag
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : companies.length > 0 ? (
        <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="font-semibold text-gray-600">Namn</TableHead>
              <TableHead className="font-semibold text-gray-600">Beskrivning</TableHead>
              <TableHead className="font-semibold text-gray-600">Åldersintervall</TableHead>
              <TableHead className="font-semibold text-gray-600">Platser</TableHead>
              <TableHead className="font-semibold text-gray-600">Tjänster</TableHead>
              <TableHead className="font-semibold text-gray-600">Målgrupper</TableHead>
              <TableHead className="font-semibold text-gray-600">Skapad</TableHead>
              <TableHead className="font-semibold text-gray-600">Åtgärder</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id} className="hover:bg-gray-50">
                <TableCell className="p-2 text-gray-800">{company.name}</TableCell>
                <TableCell className="p-2 text-gray-800">{company.description}</TableCell>
                <TableCell className="p-2 text-gray-800">{`${company.ageRangeMin}-${company.ageRangeMax}`}</TableCell>
                <TableCell className="p-2 text-gray-800">{company.locations.map(l => l.name).join(', ')}</TableCell>
                <TableCell className="p-2 text-gray-800">{company.services.map(s => s.name).join(', ')}</TableCell>
                <TableCell className="p-2 text-gray-800">{company.targetGroups.map(tg => tg.name).join(', ')}</TableCell>
                <TableCell className="p-2 text-gray-800">{formatDate(company.createdAt)}</TableCell>
                <TableCell className="p-2">
                  <Button variant="outline" size="sm" className="mr-2 text-blue-500 hover:text-blue-600" onClick={() => handleEdit(company)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(company.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          <p>Inga företag hittades. Använd knappen "Lägg till nytt företag" för att skapa ett företag.</p>
        </div>
      )}

      {(editingCompany || isAddingCompany) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{isAddingCompany ? 'Lägg till nytt företag' : 'Redigera företag'}</h2>
            <Input
              type="text"
              value={editingCompany.name}
              onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
              placeholder="Företagsnamn"
              className="mb-2"
            />
            <Input
              type="text"
              value={editingCompany.description}
              onChange={(e) => setEditingCompany({ ...editingCompany, description: e.target.value })}
              placeholder="Beskrivning"
              className="mb-2"
            />
            <Input
              type="number"
              value={editingCompany.ageRangeMin}
              onChange={(e) => setEditingCompany({ ...editingCompany, ageRangeMin: parseInt(e.target.value) })}
              placeholder="Lägsta ålder"
              className="mb-2"
            />
            <Input
             type="number"
             value={editingCompany.ageRangeMin}
             onChange={(e) => setEditingCompany({ ...editingCompany, ageRangeMin: parseInt(e.target.value) })}
             placeholder="Lägsta ålder"
             className="mb-2"
           />
           <Input
             type="number"
             value={editingCompany.ageRangeMax}
             onChange={(e) => setEditingCompany({ ...editingCompany, ageRangeMax: parseInt(e.target.value) })}
             placeholder="Högsta ålder"
             className="mb-2"
           />
           {/* Add more fields for locations, services, and target groups if needed */}
           <div className="flex justify-end">
             <Button onClick={() => { setEditingCompany(null); setIsAddingCompany(false); }} variant="outline" className="mr-2">
               Avbryt
             </Button>
             <Button onClick={isAddingCompany ? handleCreateCompany : handleSave}>
               {isAddingCompany ? 'Skapa' : 'Spara'}
             </Button>
           </div>
         </div>
       </div>
     )}
   </div>
 );
}