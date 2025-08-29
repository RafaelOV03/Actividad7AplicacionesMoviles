'use client';
import { useState } from 'react';
import LoginForm from '@/components/login-form';
import Dashboard from '@/components/dashboard';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!isAuthenticated ? (
        <LoginForm onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <Dashboard onLogout={() => setIsAuthenticated(false)} />
      )}
    </div>
  );
}
