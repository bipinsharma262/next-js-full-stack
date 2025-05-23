import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-300">
      {children}
    </main>
  );
}