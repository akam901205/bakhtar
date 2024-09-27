'use client';
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useRouter, usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log('[ClientLayout] Component mounted');
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');
      console.log('[ClientLayout] Checking login status - token:', !!token, 'email:', email);
      if (token && email) {
        setIsLoggedIn(true);
        setUserEmail(email);
        console.log('[ClientLayout] User is logged in');
        if (pathname === '/login' || pathname === '/') {
          router.replace('/valkommsida');
        }
      } else {
        setIsLoggedIn(false);
        setUserEmail(null);
        console.log('[ClientLayout] User is not logged in');
        if (pathname === '/valkommsida') {
          router.replace('/login');
        }
      }
    };
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [router, pathname]);

  const handleLogout = async () => {
    console.log('[ClientLayout] Logout initiated');
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
        setIsLoggedIn(false);
        setUserEmail(null);
        console.log('[ClientLayout] Logout completed');
        router.push('/login');
      } else {
        console.error('[ClientLayout] Logout failed');
      }
    } catch (error) {
      console.error('[ClientLayout] Error during logout:', error);
    }
  };

  console.log('[ClientLayout] Rendering - isLoggedIn:', isLoggedIn, 'userEmail:', userEmail);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} userEmail={userEmail} onLogout={handleLogout} />
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}