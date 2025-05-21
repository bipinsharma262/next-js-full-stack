
import { authOptions } from '@/lib/services/next-auth/auth';
import { getServerSession } from 'next-auth';
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-br from-indigo-100 to-violet-100">
      <Navbar session={session} />
      {children}
      <Footer />
    </div>
  );
}
