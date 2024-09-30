'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "/components/ui/table";
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { AlertCircle, CheckCircle, Loader2, Pencil, Trash2, UserPlus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "/components/ui/alert";

export default function AdminUsers() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log('Hämtar användare...');
      const response = await fetch('/api/admin/users', { 
        credentials: 'include'
      });
      console.log('Svarsstatus:', response.status);
      if (!response.ok) {
        throw new Error(`Misslyckades med att hämta användare: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Hämtade användare:', data);
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Fel vid hämtning av användare:', error);
      setError(`Fel vid hämtning av användare: ${error.message}`);
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user) => {
    setEditingUser({ ...user, password: '' });
  };


  const handleSave = async () => {
    try {
      const response = await fetch(`/api/admin/users`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Misslyckades med att uppdatera användaren');
      }
      const updatedUser = await response.json();
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      setEditingUser(null);
      setSuccessMessage('Användaren har uppdaterats');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError('Fel vid uppdatering av användare');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Är du säker på att du vill ta bort denna användare?')) {
      try {
        const response = await fetch(`/api/admin/users?id=${userId}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Misslyckades med att ta bort användaren');
        }
        setUsers(users.filter(u => u.id !== userId));
        setSuccessMessage('Användaren har tagits bort');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setError('Fel vid borttagning av användare');
      }
    }
  };

  const handleAddUser = () => {
    setIsAddingUser(true);
    setEditingUser({ firstName: '', lastName: '', email: '', password: '', isAdmin: false });
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Misslyckades med att skapa användaren');
      }
      const newUser = await response.json();
      setUsers([...users, newUser]);
      setIsAddingUser(false);
      setEditingUser(null);
      setSuccessMessage('Ny användare har skapats');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError('Fel vid skapande av ny användare');
    }
  };

  if (typeof window === 'undefined') {
    return null; // Return null on the server side
  }

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Hantera användare</h1>
      
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
          placeholder="Sök användare..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleAddUser}>
          <UserPlus className="mr-2 h-4 w-4" /> Lägg till ny användare
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : users.length > 0 ? (
        <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="font-semibold text-gray-600">E-post</TableHead>
              <TableHead className="font-semibold text-gray-600">Förnamn</TableHead>
              <TableHead className="font-semibold text-gray-600">Efternamn</TableHead>
              <TableHead className="font-semibold text-gray-600">Skapad</TableHead>
              <TableHead className="font-semibold text-gray-600">Admin</TableHead>
              <TableHead className="font-semibold text-gray-600">Åtgärder</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell className="p-2 text-gray-800">{user.email}</TableCell>
                <TableCell className="p-2 text-gray-800">{user.firstName}</TableCell>
                <TableCell className="p-2 text-gray-800">{user.lastName}</TableCell>
                <TableCell className="p-2 text-gray-800">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="p-2 text-gray-800">{user.isAdmin ? 'Ja' : 'Nej'}</TableCell>
                <TableCell className="p-2">
                  <Button variant="outline" size="sm" className="mr-2 text-blue-500 hover:text-blue-600" onClick={() => handleEdit(user)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center text-gray-500 mt-8">Inga användare hittades.</div>
      )}

      {(editingUser || isAddingUser) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{isAddingUser ? 'Lägg till ny användare' : 'Redigera användare'}</h2>
            <Input
              type="text"
              value={editingUser.firstName}
              onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
              placeholder="Förnamn"
              className="mb-2"
            />
            <Input
              type="text"
              value={editingUser.lastName}
              onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
              placeholder="Efternamn"
              className="mb-2"
            />
            <Input
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              placeholder="E-post"
              className="mb-2"
            />
            {isAddingUser && (
              <Input
                type="password"
                value={editingUser.password}
                onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                placeholder="Lösenord"
                className="mb-2"
              />
            )}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingUser.isAdmin}
                  onChange={(e) => setEditingUser({ ...editingUser, isAdmin: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-gray-800">Är admin</span>
              </label>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => { setEditingUser(null); setIsAddingUser(false); }} variant="outline" className="mr-2">
                Avbryt
              </Button>
              <Button onClick={isAddingUser ? handleCreateUser : handleSave}>
                {isAddingUser ? 'Skapa' : 'Spara'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}