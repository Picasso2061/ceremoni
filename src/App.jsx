import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import VendorListPage from './pages/VendorListPage';
import VendorProfilePage from './pages/VendorProfilePage';
import VendorRegisterPage from './pages/VendorRegisterPage';
import CustomerDashboardPage from './pages/CustomerDashboardPage';
import BookingPage from './pages/BookingPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/vendors" element={<VendorListPage />} />
            <Route path="/vendors/:id" element={<VendorProfilePage />} />
            <Route path="/register" element={<VendorRegisterPage />} />
            <Route path="/dashboard" element={<CustomerDashboardPage />} />
            <Route path="/booking/:vendorId" element={<BookingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
