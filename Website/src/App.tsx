import React from 'react';
    import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
    import { LoginForm } from './components/auth/LoginForm';
    import { DashboardLayout } from './components/dashboard/DashboardLayout';
    import { AdminDashboard } from './components/dashboard/AdminDashboard';
    import { WarehouseDashboard } from './components/dashboard/WarehouseDashboard';
    import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
    import Returns from './components/returns/Returns';
    import { Analytics } from './components/analytics/Analytics';
    import { Settings } from './components/settings/Settings';
    import { Marketplace } from './components/marketplace/Marketplace';
    import { useAuthStore } from './store/auth';
    import { Orders } from './components/orders/Orders';

    function ProtectedRoute({ children }: { children: React.ReactNode }) {
      const user = useAuthStore((state) => state.user);
      return user ? <>{children}</> : <Navigate to="/login" />;
    }

    function App() {
      const role = useAuthStore((state) => state.role);

      const getDashboardComponent = () => {
        switch (role) {
          case 'admin':
            return <AdminDashboard />;
          case 'warehouse':
            return <WarehouseDashboard />;
          case 'customer':
            return <CustomerDashboard />;
          default:
            return <Navigate to="/login" />;
        }
      };

      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Routes>
                      <Route index element={getDashboardComponent()} />
                      <Route path="returns" element={<Returns />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="settings" element={<Settings />} />
                      {role === 'customer' && (
                        <>
                          <Route path="marketplace" element={<Marketplace />} />
                          <Route path="orders" element={<Orders />} />
                        </>
                      )}
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      );
    }

    export default App
