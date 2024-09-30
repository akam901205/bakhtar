'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');
      const storedIsAdmin = localStorage.getItem('isAdmin');
      
      if (token && email) {
        setIsLoggedIn(true);
        setUserEmail(email);
        setIsAdmin(storedIsAdmin === 'true');
      } else {
        setIsLoggedIn(false);
        setUserEmail(null);
        setIsAdmin(false);
      }
    };
   
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isAdmin');
        setIsLoggedIn(false);
        setUserEmail(null);
        setIsAdmin(false);
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (!isMounted) {
    // Return a minimal layout or loading indicator
    return <div>Laddar...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        isLoggedIn={isLoggedIn} 
        userEmail={userEmail} 
        onLogout={handleLogout} 
      />
      <Navigation 
        isLoggedIn={isLoggedIn} 
        isAdmin={isAdmin} 
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}