import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Eye, Heart, CalendarCheck, Percent,
  CheckCircle2, XCircle, Clock, Edit3, DollarSign
} from 'lucide-react';
import Badge from '../components/Badge';
import './VendorDashboardPage.css';
import '../pages/CustomerDashboardPage.css'; // Reuse some layout styles

export default function VendorDashboardPage() {
  const { state, dispatch } = useApp();
  const { user, vendorStats, incomingRequests } = state;

  const handleAccept = (id) => dispatch({ type: 'UPDATE_REQUEST_STATUS', payload: { id, status: 'accepted' } });
  const handleDecline = (id) => dispatch({ type: 'UPDATE_REQUEST_STATUS', payload: { id, status: 'declined' } });

  return (
    <div className="vendor-dashboard-page dashboard-page">
      {/* ── Header ── */}
      <section className="dash-header" id="vendor-dashboard-header">
        <div className="container">
          <div className="dash-header__content animate-fade-in-up">
            <div>
              <h1 className="dash-header__title">Vendor Dashboard</h1>
              <p className="dash-header__subtitle">Manage your listing and bookings</p>
            </div>
            <Link to={`/vendors/${user.vendorId}`} className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
              <Eye size={16} />
              View Public Profile
            </Link>
          </div>
        </div>
      </section>

      <div className="container dash-body">
        {/* ── Stats Cards ── */}
        <div className="dash-stats" id="vendor-stats">
          <div className="dash-stat-card animate-fade-in-up">
            <div className="dash-stat-card__icon dash-stat-card__icon--blue">
              <Eye size={22} />
            </div>
            <div className="dash-stat-card__info">
              <span className="dash-stat-card__value">{vendorStats.views}</span>
              <span className="dash-stat-card__label">Profile Views</span>
            </div>
          </div>
          <div className="dash-stat-card animate-fade-in-up animate-delay-1">
            <div className="dash-stat-card__icon dash-stat-card__icon--purple">
              <Heart size={22} />
            </div>
            <div className="dash-stat-card__info">
              <span className="dash-stat-card__value">{vendorStats.favorites}</span>
              <span className="dash-stat-card__label">Favorites</span>
            </div>
          </div>
          <div className="dash-stat-card animate-fade-in-up animate-delay-2">
            <div className="dash-stat-card__icon dash-stat-card__icon--green">
              <CalendarCheck size={22} />
            </div>
            <div className="dash-stat-card__info">
              <span className="dash-stat-card__value">{vendorStats.bookings}</span>
              <span className="dash-stat-card__label">Bookings</span>
            </div>
          </div>
          <div className="dash-stat-card animate-fade-in-up animate-delay-3">
            <div className="dash-stat-card__icon dash-stat-card__icon--gold">
              <Percent size={22} />
            </div>
            <div className="dash-stat-card__info">
              <span className="dash-stat-card__value">{vendorStats.responseRate}%</span>
              <span className="dash-stat-card__label">Response Rate</span>
            </div>
          </div>
        </div>

        <div className="dash-grid">
          {/* ── Main Column ── */}
          <div className="dash-main">
            <div className="dash-card animate-fade-in-up" id="incoming-requests">
              <div className="dash-card__header">
                <h2>Incoming Booking Requests</h2>
              </div>
              <div className="vendor-requests-list">
                {incomingRequests.map(req => (
                  <div key={req.id} className="vendor-request-item">
                    <div className="vendor-request-item__header">
                      <div>
                        <h3>{req.clientName}</h3>
                        <p>{req.eventType === 'wedding' ? '💍 Wedding' : '🕊️ Burial'} • {new Date(req.eventDate).toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <Badge variant={req.status}>
                        {req.status === 'pending' && <Clock size={10} />}
                        {req.status === 'accepted' && <CheckCircle2 size={10} />}
                        {req.status === 'declined' && <XCircle size={10} />}
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="vendor-request-item__body">
                      <div className="vendor-request-item__details">
                        <p><strong>Service:</strong> {req.selectedService}</p>
                        <p><strong>Guests:</strong> {req.guestCount}</p>
                        {req.specialRequests && <p><strong>Note:</strong> {req.specialRequests}</p>}
                      </div>
                      <div className="vendor-request-item__contact">
                        <p><strong>Email:</strong> {req.clientEmail}</p>
                        <p><strong>Phone:</strong> {req.clientPhone}</p>
                      </div>
                    </div>
                    {req.status === 'pending' && (
                      <div className="vendor-request-item__actions">
                        <button className="btn btn-outline btn-sm" onClick={() => handleDecline(req.id)}>
                          Decline
                        </button>
                        <button className="btn btn-primary btn-sm" onClick={() => handleAccept(req.id)}>
                          Accept Request
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="dash-sidebar">
            <div className="dash-card animate-fade-in-up" id="quick-edit">
              <div className="dash-card__header">
                <h2>Quick Actions</h2>
              </div>
              <div className="quick-edit-menu">
                <button className="quick-edit-btn">
                  <Edit3 size={16} /> Edit Profile Info
                </button>
                <button className="quick-edit-btn">
                  <CalendarCheck size={16} /> Update Availability
                </button>
                <button className="quick-edit-btn">
                  <DollarSign size={16} /> Manage Pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
