import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import VendorListPage from './pages/VendorListPage';
import VendorProfilePage from './pages/VendorProfilePage';
import VendorRegisterPage from './pages/VendorRegisterPage';
import CustomerDashboardPage from './pages/CustomerDashboardPage';
import BookingPage from './pages/BookingPage';
import VendorDashboardPage from './pages/VendorDashboardPage';
import VendorPortalLayout from './components/VendorPortalLayout';
import CustomerPortalLayout from './components/CustomerPortalLayout';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/vendors" element={<VendorListPage />} />
            <Route path="/vendors/:id" element={<VendorProfilePage />} />
            <Route path="/booking/:vendorId" element={<BookingPage />} />
          </Route>
          <Route path="/customer" element={<CustomerPortalLayout />}>
            <Route index element={<CustomerDashboardPage />} />
            <Route path="dashboard" element={<Navigate to="/customer" replace />} />
          </Route>
          <Route path="/vendor" element={<VendorPortalLayout />}>
            <Route index element={<VendorDashboardPage />} />
            <Route path="register" element={<VendorRegisterPage />} />
          </Route>
          <Route path="/dashboard" element={<Navigate to="/customer" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
