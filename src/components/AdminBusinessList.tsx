'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "/components/ui/table";
import { Button } from "../../components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';
import EditBusinessForm from './EditBusinessForm';

const AdminBusinessList = ({ initialBusinesses = [] }) => {
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [expandedRows, setExpandedRows] = useState({});
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    setBusinesses(initialBusinesses);
  }, [initialBusinesses]);

  const toggleRowExpansion = (businessId) => {
    setExpandedRows(prev => ({
      ...prev,
      [businessId]: !prev[businessId]
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = (business) => {
    setEditingBusiness(business);
    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedBusiness) => {
    try {
      const response = await fetch(`/api/businesses/${updatedBusiness.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBusiness),
      });

      if (response.ok) {
        setBusinesses(businesses.map(b => b.id === updatedBusiness.id ? updatedBusiness : b));
        setIsEditModalOpen(false);
        setEditingBusiness(null);
      } else {
        console.error('Failed to update business');
      }
    } catch (error) {
      console.error('Error updating business:', error);
    }
  };

  const handleDelete = async (businessId) => {
    if (confirm('Are you sure you want to delete this business?')) {
      try {
        const response = await fetch(`/api/businesses/${businessId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setBusinesses(businesses.filter(b => b.id !== businessId));
        } else {
          console.error('Failed to delete business');
        }
      } catch (error) {
        console.error('Error deleting business:', error);
      }
    }
  };

  if (!businesses || businesses.length === 0) {
    return <div>No businesses found.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Dashboard - Hantera verksamheter</h2>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="text-gray-900 font-semibold w-10"></TableHead>
            <TableHead className="text-gray-900 font-semibold">Namn</TableHead>
            <TableHead className="text-gray-900 font-semibold">Företagsnamn</TableHead>
            <TableHead className="text-gray-900 font-semibold">Typ</TableHead>
            <TableHead className="text-gray-900 font-semibold">Län</TableHead>
            <TableHead className="text-gray-900 font-semibold">Kommun</TableHead>
            <TableHead className="text-gray-900 font-semibold">Åtgärder</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {businesses.map((business) => (
            <React.Fragment key={business.id}>
              <TableRow className="hover:bg-gray-100">
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRowExpansion(business.id)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {expandedRows[business.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </Button>
                </TableCell>
                <TableCell className="text-gray-800 font-medium">{business.name}</TableCell>
                <TableCell className="text-gray-800">{business.companyName}</TableCell>
                <TableCell className="text-gray-800">{business.type}</TableCell>
                <TableCell className="text-gray-800">{business.county}</TableCell>
                <TableCell className="text-gray-800">{business.municipality}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(business)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold mr-2"
                  >
                    Redigera
                  </Button>
                  <Button
                    onClick={() => handleDelete(business.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold"
                  >
                    Ta bort
                  </Button>
                </TableCell>
              </TableRow>
              {expandedRows[business.id] && (
                <TableRow>
                  <TableCell colSpan={7} className="bg-gray-100 p-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p><strong>Org. nummer:</strong> {business.orgNumber}</p>
                        <p><strong>Adress:</strong> {business.streetAddress}</p>
                        <p><strong>Postnummer:</strong> {business.postalCode}</p>
                        <p><strong>Ort:</strong> {business.city}</p>
                      </div>
                      <div>
                        <p><strong>Telefon:</strong> {business.phone}</p>
                        <p><strong>Hemsida:</strong> {business.website}</p>
                        <p><strong>Skyddat boende:</strong> {business.isSkyddatBoende ? 'Ja' : 'Nej'}</p>
                        <p><strong>Koncern/kedja:</strong> {business.koncern || 'N/A'}</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      {editingBusiness && (
        <EditBusinessForm
          business={editingBusiness}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingBusiness(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminBusinessList;