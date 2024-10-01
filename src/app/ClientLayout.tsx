'use client';

import React from "react";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        isLoggedIn={!!session}
        userEmail={session?.user?.email || null}
        onLogout={handleLogout}
      />
      <Navigation
        isLoggedIn={!!session}
        isAdmin={session?.user?.isAdmin || false}
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LayoutContent>{children}</LayoutContent>
    </SessionProvider>
  );
}