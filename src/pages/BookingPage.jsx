import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar, Users, MessageSquare, ArrowLeft, CheckCircle2,
  MapPin, ShieldCheck, Star
} from 'lucide-react';
import StarRating from '../components/StarRating';
import Badge from '../components/Badge';
import { useApp } from '../context/AppContext';
import vendors from '../data/vendors';
import categories from '../data/categories';
import './BookingPage.css';

export default function BookingPage() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const vendor = vendors.find(v => v.id === vendorId);
  const cat = categories.find(c => c.id === vendor?.category);
  const CatIcon = cat?.icon;

  const [form, setForm] = useState({
    eventType: 'wedding',
    eventDate: '',
    guestCount: '',
    selectedService: '',
    specialRequests: '',
    fullName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!vendor) {
    return (
      <div className="bp-not-found">
        <div className="container">
          <h2>Vendor not found</h2>
          <Link to="/vendors" className="btn btn-primary">Browse Vendors</Link>
        </div>
      </div>
    );
  }

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.eventDate) newErrors.eventDate = 'Event date is required';
    if (!form.guestCount) newErrors.guestCount = 'Guest count is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const booking = {
        id: 'b' + Date.now().toString(36),
        vendorId: vendor.id,
        vendorName: vendor.name,
        category: vendor.category,
        eventType: form.eventType,
        eventDate: form.eventDate,
        status: 'pending',
        totalPrice: form.selectedService
          ? vendor.services.find(s => s.name === form.selectedService)?.price || 'TBD'
          : 'Quote Pending',
        notes: form.specialRequests || `${form.guestCount} guests`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      dispatch({ type: 'ADD_BOOKING', payload: booking });
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="bp-success" id="booking-success">
        <div className="bp-success__card animate-scale-in">
          <div className="bp-success__icon">
            <CheckCircle2 size={48} />
          </div>
          <h2>Quote Request Sent!</h2>
          <p>
            Your booking request has been sent to <strong>{vendor.name}</strong>.
            They'll respond within 24-48 hours with a detailed quote.
          </p>
          <div className="bp-success__actions">
            <Link to="/dashboard" className="btn btn-accent btn-lg">
              View Dashboard
            </Link>
            <Link to="/vendors" className="btn btn-outline btn-lg">
              Browse More Vendors
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <section className="bp-header" id="booking-header">
        <div className="container">
          <Link to={`/vendors/${vendor.id}`} className="bp-back animate-fade-in">
            <ArrowLeft size={16} />
            Back to {vendor.name}
          </Link>
          <h1 className="bp-header__title animate-fade-in-up">Request a Quote</h1>
        </div>
      </section>

      <div className="container bp-body">
        <div className="bp-layout">
          {/* ── Booking Form ── */}
          <form className="bp-form animate-fade-in-up" onSubmit={handleSubmit} id="booking-form">
            {/* Contact Details */}
            <div className="bp-form-section">
              <h2>Your Details</h2>
              <div className="bp-form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className={`form-input ${errors.fullName ? 'form-input--error' : ''}`}
                    value={form.fullName}
                    onChange={(e) => updateForm('fullName', e.target.value)}
                    placeholder="Your full name"
                    id="input-fullname"
                  />
                  {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    value={form.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                    placeholder="you@example.com"
                    id="input-email"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
                <div className="form-group bp-full-width">
                  <label className="form-label">Phone *</label>
                  <input
                    type="tel"
                    className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                    value={form.phone}
                    onChange={(e) => updateForm('phone', e.target.value)}
                    placeholder="+234 800 000 0000"
                    id="input-phone"
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="bp-form-section">
              <h2>Event Details</h2>
              <div className="bp-form-grid">
                <div className="form-group">
                  <label className="form-label">Event Type</label>
                  <select
                    className="form-select"
                    value={form.eventType}
                    onChange={(e) => updateForm('eventType', e.target.value)}
                    id="input-event-type"
                  >
                    {vendor.eventTypes.map(et => (
                      <option key={et} value={et}>
                        {et === 'wedding' ? '💍 Wedding' : '🕊️ Burial Ceremony'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Event Date *</label>
                  <input
                    type="date"
                    className={`form-input ${errors.eventDate ? 'form-input--error' : ''}`}
                    value={form.eventDate}
                    onChange={(e) => updateForm('eventDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    id="input-event-date"
                  />
                  {errors.eventDate && <span className="form-error">{errors.eventDate}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Number of Guests *</label>
                  <input
                    type="number"
                    className={`form-input ${errors.guestCount ? 'form-input--error' : ''}`}
                    value={form.guestCount}
                    onChange={(e) => updateForm('guestCount', e.target.value)}
                    placeholder="e.g. 200"
                    min="1"
                    id="input-guest-count"
                  />
                  {errors.guestCount && <span className="form-error">{errors.guestCount}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Service</label>
                  <select
                    className="form-select"
                    value={form.selectedService}
                    onChange={(e) => updateForm('selectedService', e.target.value)}
                    id="input-service"
                  >
                    <option value="">Select a service (optional)</option>
                    {vendor.services.map((svc, i) => (
                      <option key={i} value={svc.name}>
                        {svc.name} — {svc.price}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group bp-full-width">
                  <label className="form-label">Special Requests</label>
                  <textarea
                    className="form-textarea"
                    value={form.specialRequests}
                    onChange={(e) => updateForm('specialRequests', e.target.value)}
                    placeholder="Any special requirements, preferences, or questions..."
                    id="input-special-requests"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-accent btn-lg bp-submit-btn" id="submit-booking">
              <MessageSquare size={18} />
              Send Quote Request
            </button>
          </form>

          {/* ── Vendor Summary Sidebar ── */}
          <aside className="bp-sidebar animate-fade-in-up animate-delay-2" id="booking-sidebar">
            <div className="bp-vendor-summary glass-card">
              <div className="bp-vendor-summary__header" style={{ background: cat?.gradient }}>
                {CatIcon && <CatIcon size={36} strokeWidth={1} />}
              </div>
              <div className="bp-vendor-summary__body">
                <div className="bp-vendor-summary__badges">
                  <Badge variant="category">
                    {CatIcon && <CatIcon size={11} />}
                    {cat?.name}
                  </Badge>
                  {vendor.verified && (
                    <Badge variant="verified">
                      <ShieldCheck size={11} />
                      Verified
                    </Badge>
                  )}
                </div>
                <h3 className="bp-vendor-summary__name">{vendor.name}</h3>
                <div className="bp-vendor-summary__meta">
                  <span>
                    <MapPin size={13} />
                    {vendor.location}
                  </span>
                </div>
                <div className="bp-vendor-summary__rating">
                  <StarRating rating={vendor.rating} size={14} showValue reviewCount={vendor.reviewCount} />
                </div>
                <div className="bp-vendor-summary__divider" />
                <h4>Services</h4>
                <ul className="bp-vendor-summary__services">
                  {vendor.services.map((svc, i) => (
                    <li key={i}>
                      <span>{svc.name}</span>
                      <span className="bp-vendor-summary__price">{svc.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
