import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Heart, User, ChevronDown } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';
  const navClass = `navbar ${isScrolled || !isHome ? 'navbar--solid' : 'navbar--transparent'}`;

  const links = [
    { to: '/', label: 'Home' },
    { to: '/vendors', label: 'Find Vendors' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <>
      <nav className={navClass} id="navbar">
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo" id="navbar-logo">
            <span className="navbar__logo-icon">C</span>
            <span className="navbar__logo-text">CereMoni</span>
          </Link>

          <ul className="navbar__links">
            {links.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <Link to="/vendors" className="navbar__action-btn" aria-label="Search vendors">
              <Search size={18} />
            </Link>
            <Link to="/dashboard" className="navbar__action-btn" aria-label="Favorites">
              <Heart size={18} />
            </Link>
            <Link to="/register" className="btn btn-accent btn-sm navbar__cta">
              Join as Vendor
            </Link>
            <button
              className="navbar__hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              id="navbar-menu-toggle"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`} id="mobile-menu">
        <div className="mobile-menu__overlay" onClick={() => setMobileOpen(false)} />
        <div className="mobile-menu__panel">
          <div className="mobile-menu__header">
            <Link to="/" className="navbar__logo">
              <span className="navbar__logo-icon">C</span>
              <span className="navbar__logo-text">CereMoni</span>
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <ul className="mobile-menu__links">
            {links.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`mobile-menu__link ${location.pathname === link.to ? 'mobile-menu__link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/register" className="mobile-menu__link">
                Join as Vendor
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
