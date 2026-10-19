import { Link, Outlet, useLocation } from 'react-router-dom';
import { Heart, Search, Sparkles } from 'lucide-react';
import './CustomerPortalLayout.css';

export default function CustomerPortalLayout() {
  const location = useLocation();
  const isDashboard = location.pathname === '/customer' || location.pathname === '/customer/dashboard';
  const isPlan = location.pathname === '/customer/plan';

  return (
    <div className="customer-portal">
      <header className="customer-portal__header">
        <div className="container customer-portal__header-inner">
          <Link to="/customer" className="customer-portal__logo">
            <span className="customer-portal__logo-icon">C</span>
            <span>CereMoni</span>
          </Link>
          <nav className="customer-portal__nav" aria-label="Customer portal navigation">
            <Link className={isDashboard ? 'customer-portal__nav-link customer-portal__nav-link--active' : 'customer-portal__nav-link'} to="/customer">
              My Dashboard
            </Link>
            <Link className={isPlan ? 'customer-portal__nav-link customer-portal__nav-link--active' : 'customer-portal__nav-link'} to="/customer/plan">
              <Sparkles size={16} /> Plan Event
            </Link>
            <Link className="customer-portal__nav-link" to="/vendors">
              <Search size={16} /> Find vendors
            </Link>
            <Link className="customer-portal__nav-link" to="/vendors">
              <Heart size={16} /> Saved vendors
            </Link>
            <Link className="customer-portal__public-link" to="/">
              Public site
            </Link>
          </nav>
        </div>
      </header>
      <main><Outlet /></main>
    </div>
  );
}
