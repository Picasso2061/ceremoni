import { Link, Outlet, useLocation } from 'react-router-dom';
import './VendorPortalLayout.css';

export default function VendorPortalLayout() {
  const location = useLocation();

  return (
    <div className="vendor-portal">
      <header className="vendor-portal__header">
        <div className="container vendor-portal__header-inner">
          <Link to="/vendor" className="vendor-portal__logo">
            <span className="vendor-portal__logo-icon">C</span>
            <span>CereMoni Vendor Portal</span>
          </Link>
          <nav className="vendor-portal__nav" aria-label="Vendor portal navigation">
            <Link
              className={location.pathname === '/vendor' ? 'vendor-portal__nav-link vendor-portal__nav-link--active' : 'vendor-portal__nav-link'}
              to="/vendor"
            >
              Dashboard
            </Link>
            <Link
              className={location.pathname === '/vendor/register' ? 'vendor-portal__nav-link vendor-portal__nav-link--active' : 'vendor-portal__nav-link'}
              to="/vendor/register"
            >
              Apply as a vendor
            </Link>
            <Link className="vendor-portal__public-link" to="/">
              Customer site
            </Link>
          </nav>
        </div>
      </header>
      <main><Outlet /></main>
    </div>
  );
}
