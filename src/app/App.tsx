import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/app/contexts/AuthContext';
import { CreditProvider } from '@/app/contexts/CreditContext';
import { Layout } from '@/app/components/Layout';
import { Home } from '@/app/pages/Home';
import { About } from '@/app/pages/About';
import { Features } from '@/app/pages/Features';
import { FAQ } from '@/app/pages/FAQ';
import { Contact } from '@/app/pages/Contact';
import { GetStarted } from '@/app/pages/GetStarted';
import { Dashboard } from '@/app/pages/Dashboard';
import { Toaster } from '@/app/components/ui/sonner';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/get-started" replace />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CreditProvider>
          <AppRoutes />
          <Toaster position="top-right" />
        </CreditProvider>
      </AuthProvider>
    </Router>
  );
}
