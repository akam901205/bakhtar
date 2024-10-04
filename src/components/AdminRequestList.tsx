'use client';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "/components/ui/table";
import { Button } from "../../components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';

const AdminRequestList = ({ requests: initialRequests }) => {
  const [requests, setRequests] = useState(initialRequests);
  const [expandedRows, setExpandedRows] = useState({});

  const handleApprove = async (requestId) => {
    const response = await fetch(`/api/admin/requests/${requestId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'GODKÄND' }),
    });
    if (response.ok) {
      setRequests(requests.map(req =>
        req.id === requestId ? { ...req, status: 'GODKÄND' } : req
      ));
    }
  };

  const handleReject = async (requestId) => {
    const response = await fetch(`/api/admin/requests/${requestId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'AVVISAD' }),
    });
    if (response.ok) {
      setRequests(requests.map(req =>
        req.id === requestId ? { ...req, status: 'AVVISAD' } : req
      ));
    }
  };

  const toggleRowExpansion = (requestId) => {
    setExpandedRows(prev => ({
      ...prev,
      [requestId]: !prev[requestId]
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

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Dashboard - Väntande förfrågningar</h2>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="text-gray-900 font-semibold w-10"></TableHead>
            <TableHead className="text-gray-900 font-semibold">Användare</TableHead>
            <TableHead className="text-gray-900 font-semibold">Län</TableHead>
            <TableHead className="text-gray-900 font-semibold">Kommun</TableHead>
            <TableHead className="text-gray-900 font-semibold">Interventionstyp</TableHead>
            <TableHead className="text-gray-900 font-semibold">Status</TableHead>
            <TableHead className="text-gray-900 font-semibold">Åtgärder</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <React.Fragment key={request.id}>
              <TableRow className="hover:bg-gray-100">
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRowExpansion(request.id)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {expandedRows[request.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </Button>
                </TableCell>
                <TableCell className="text-gray-800 font-medium">{request.user?.email || 'Anonym'}</TableCell>
                <TableCell className="text-gray-800">{request.lan}</TableCell>
                <TableCell className="text-gray-800">{request.kommun}</TableCell>
                <TableCell className="text-gray-800">{request.interventionType}</TableCell>
                <TableCell className="text-gray-800 font-medium">{request.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleApprove(request.id)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold mr-2"
                    disabled={request.status !== 'VÄNTANDE_GODKÄNNANDE'}
                  >
                    Godkänn
                  </Button>
                  <Button
                    onClick={() => handleReject(request.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold"
                    disabled={request.status !== 'VÄNTANDE_GODKÄNNANDE'}
                  >
                    Avvisa
                  </Button>
                </TableCell>
              </TableRow>
              {expandedRows[request.id] && (
                <TableRow>
                  <TableCell colSpan={7} className="bg-gray-100 p-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-gray-800">
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900">Kontaktinformation</h3>
                        <p><span className="font-medium">Namn:</span> {request.name}</p>
                        <p><span className="font-medium">E-post:</span> {request.email}</p>
                        <p><span className="font-medium">Telefon:</span> {request.phone}</p>
                        <p><span className="font-medium">Mobil:</span> {request.mobile}</p>
                        <p><span className="font-medium">Anonym:</span> {request.isAnonymous ? 'Ja' : 'Nej'}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900">Klientinformation</h3>
                        <p><span className="font-medium">Ålder:</span> {request.clientAge}</p>
                        <p><span className="font-medium">Kön:</span> {request.clientGender}</p>
                        <p><span className="font-medium">Behov:</span> {request.clientNeeds}</p>
                      </div>
                      <div className="col-span-2">
                        <h3 className="font-semibold mb-2 text-gray-900">Beskrivning</h3>
                        <p>{request.description}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900">Insatsinformation</h3>
                        <p><span className="font-medium">Önskad plats:</span> {request.desiredLocation}</p>
                        <p><span className="font-medium">Önskat startdatum:</span> {formatDate(request.desiredStartDate)}</p>
                        <p><span className="font-medium">Önskat svarsdatum:</span> {formatDate(request.desiredResponseDate)}</p>
                        <p><span className="font-medium">Skickad till andra:</span> {request.sentToOthers ? 'Ja' : 'Nej'}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-gray-900">Metadata</h3>
                        <p><span className="font-medium">Skapad:</span> {formatDate(request.createdAt)}</p>
                        <p><span className="font-medium">Uppdaterad:</span> {formatDate(request.updatedAt)}</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminRequestList;