import { Link } from 'react-router-dom';
import { Globe, Link2, Share2, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon">C</span>
              <span className="footer__logo-text">CereMoni</span>
            </Link>
            <p className="footer__tagline">
              Connecting you with verified vendors for life's most meaningful celebrations.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram"><Globe size={18} /></a>
              <a href="#" className="footer__social" aria-label="Facebook"><Link2 size={18} /></a>
              <a href="#" className="footer__social" aria-label="Twitter"><Share2 size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__list">
              <li><Link to="/vendors">Find Vendors</Link></li>
              <li><Link to="/vendors?eventType=wedding">Plan a Wedding</Link></li>
              <li><Link to="/vendors?eventType=burial">Plan a Ceremony</Link></li>
              <li><Link to="/register">Join as Vendor</Link></li>
              <li><Link to="/dashboard">My Dashboard</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer__col">
            <h4 className="footer__heading">Categories</h4>
            <ul className="footer__list">
              <li><Link to="/vendors?category=venues">Venues</Link></li>
              <li><Link to="/vendors?category=catering">Catering</Link></li>
              <li><Link to="/vendors?category=photography">Photography</Link></li>
              <li><Link to="/vendors?category=decor">Décor & Florals</Link></li>
              <li><Link to="/vendors?category=music">Music & DJ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__heading">Contact Us</h4>
            <ul className="footer__list footer__contact-list">
              <li>
                <Mail size={14} />
                <span>hello@ceremoni.ng</span>
              </li>
              <li>
                <Phone size={14} />
                <span>+234 800 CEREMONI</span>
              </li>
              <li>
                <MapPin size={14} />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer__newsletter">
          <div className="footer__newsletter-text">
            <h4>Stay Updated</h4>
            <p>Get the latest vendor features and event planning tips.</p>
          </div>
          <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="footer__newsletter-input"
              aria-label="Email for newsletter"
            />
            <button type="submit" className="btn btn-accent btn-sm">Subscribe</button>
          </form>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p>&copy; 2026 CereMoni. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
