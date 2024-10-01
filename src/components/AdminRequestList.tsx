'use client';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "/components/ui/table";
import { Button } from "/components/ui/button";

const AdminRequestList = ({ requests: initialRequests }) => {
  const [requests, setRequests] = useState(initialRequests);

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

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Dashboard - Väntande förfrågningar</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-700">Användare</TableHead>
            <TableHead className="text-gray-700">Län</TableHead>
            <TableHead className="text-gray-700">Kommun</TableHead>
            <TableHead className="text-gray-700">Interventionstyp</TableHead>
            <TableHead className="text-gray-700">Status</TableHead>
            <TableHead className="text-gray-700">Åtgärder</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.user.email}</TableCell>
              <TableCell>{request.lan}</TableCell>
              <TableCell>{request.kommun}</TableCell>
              <TableCell>{request.interventionType}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleApprove(request.id)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white mr-2"
                  disabled={request.status !== 'VÄNTANDE'}
                >
                  Godkänn
                </Button>
                <Button
                  onClick={() => handleReject(request.id)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                  disabled={request.status !== 'VÄNTANDE'}
                >
                  Avvisa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminRequestList;