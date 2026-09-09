import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CompareDrawer from './CompareDrawer';
import CompareModal from './CompareModal';

export default function Layout() {
  const { pathname } = useLocation();
  const [showCompareModal, setShowCompareModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <CompareDrawer onCompare={() => setShowCompareModal(true)} />
      {showCompareModal && (
        <CompareModal onClose={() => setShowCompareModal(false)} />
      )}
    </div>
  );
}

