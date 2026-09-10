import { Link } from 'react-router-dom';
import {
  Calendar, DollarSign, Users, CheckCircle2, Clock,
  ArrowRight, Plus, TrendingUp, Heart, ChevronRight,
  MapPin, AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import vendors from '../data/vendors';
import categories from '../data/categories';
import Badge from '../components/Badge';
import EventTimeline from '../components/EventTimeline';
import ChatWidget from '../components/ChatWidget';
import './CustomerDashboardPage.css';

export default function CustomerDashboardPage() {
  const { state, dispatch } = useApp();
  const { user, bookings, event, favorites, checklist } = state;

  const budgetPercent = Math.round((event.spent / event.budget) * 100);
  const daysUntilEvent = Math.max(0, Math.ceil((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24)));
  const completedChecklist = checklist.filter(c => c.done).length;
  const favVendors = vendors.filter(v => favorites.includes(v.id));

  const formatCurrency = (num) => '₦' + num.toLocaleString();

  return (
    <div className="dashboard-page">
      {/* ── Header ── */}
      <section className="dash-header" id="dashboard-header">
        <div className="container">
          <div className="dash-header__content animate-fade-in-up">
            <div>
              <h1 className="dash-header__title">Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className="dash-header__subtitle">{event.title}</p>
            </div>
            <Link to="/vendors" className="btn btn-accent">
              <Plus size={16} />
              Add Vendor
            </Link>
          </div>
        </div>
      </section>

      <div className="container dash-body">
        {/* ── Stats Cards ── */}
        <div className="dash-stats" id="dashboard-stats">
          <div className="dash-stat-card animate-fade-in-up">
            <div className="dash-stat-card__icon dash-stat-card__icon--purple">
              <Calendar size={22} />
            </div>
            <div className="dash-stat-card__info">
              <span className="dash-stat-card__value">{daysUntilEvent}</span>
              <span className="dash-stat-card__label">Days Until Event</span>
            </div>
          </div>

          <div className="dash-stat-card animate-fade-in-up animate-delay-1">
            <div className="dash-stat-card__icon dash-stat-card__icon--gold">
              <DollarSign size={22} />
            </div>
            <div className="dash-stat-card__info">
              <span className="dash-stat-card__value">{budgetPercent}%</span>
              <span className="dash-stat-card__label">Budget Used</span>
            </div>
          </div>

          <div className="dash-stat-card animate-fade-in-up animate-delay-2">
            <div className="dash-stat-card__icon dash-stat-card__icon--green">
              <CheckCircle2 size={22} />
            </div>
            <div className="dash-stat-card__info">
              <span className="dash-stat-card__value">{bookings.length}</span>
              <span className="dash-stat-card__label">Vendors Booked</span>
            </div>
          </div>

          <div className="dash-stat-card animate-fade-in-up animate-delay-3">
            <div className="dash-stat-card__icon dash-stat-card__icon--blue">
              <Users size={22} />
            </div>
            <div className="dash-stat-card__info">
              <span className="dash-stat-card__value">{event.guestCount}</span>
              <span className="dash-stat-card__label">Guests Expected</span>
            </div>
          </div>
        </div>

        <div className="dash-grid">
          {/* ── Main Column ── */}
          <div className="dash-main">
            {/* Event Timeline */}
            <div className="dash-card animate-fade-in-up" id="event-timeline-card">
              <div className="dash-card__header">
                <h2>
                  <Calendar size={16} />
                  Event Timeline
                </h2>
              </div>
              <EventTimeline eventDate={event.date} bookings={bookings} />
            </div>

            {/* Event Overview */}
            <div className="dash-card animate-fade-in-up" id="event-overview">
              <div className="dash-card__header">
                <h2>Event Overview</h2>
              </div>
              <div className="dash-event-info">
                <div className="dash-event-info__row">
                  <span className="dash-event-info__label">Event Type</span>
                  <Badge variant={event.type}>{event.type === 'wedding' ? '💍 Wedding' : '🕊️ Burial'}</Badge>
                </div>
                <div className="dash-event-info__row">
                  <span className="dash-event-info__label">Date</span>
                  <span className="dash-event-info__value">
                    {new Date(event.date).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <div className="dash-event-info__row">
                  <span className="dash-event-info__label">Guest Count</span>
                  <span className="dash-event-info__value">{event.guestCount} guests</span>
                </div>
              </div>

              {/* Budget Progress */}
              <div className="dash-budget">
                <div className="dash-budget__header">
                  <span className="dash-budget__title">
                    <TrendingUp size={16} />
                    Budget Tracker
                  </span>
                  <span className="dash-budget__amounts">
                    {formatCurrency(event.spent)} / {formatCurrency(event.budget)}
                  </span>
                </div>
                <div className="dash-budget__bar">
                  <div
                    className="dash-budget__fill"
                    style={{ '--progress': `${budgetPercent}%` }}
                  />
                </div>
                <div className="dash-budget__footer">
                  <span className="dash-budget__remaining">
                    {formatCurrency(event.budget - event.spent)} remaining
                  </span>
                  <span className={`dash-budget__percent ${budgetPercent > 80 ? 'dash-budget__percent--warning' : ''}`}>
                    {budgetPercent}% used
                  </span>
                </div>
              </div>
            </div>

            {/* Booked Vendors */}
            <div className="dash-card animate-fade-in-up" id="booked-vendors">
              <div className="dash-card__header">
                <h2>Booked Vendors</h2>
                <Link to="/vendors" className="dash-card__link">
                  Browse More <ChevronRight size={14} />
                </Link>
              </div>

              <div className="dash-bookings-list">
                {bookings.map(booking => {
                  const vendor = vendors.find(v => v.id === booking.vendorId);
                  const cat = categories.find(c => c.id === booking.category);
                  const CatIcon = cat?.icon;

                  return (
                    <Link
                      to={`/vendors/${booking.vendorId}`}
                      key={booking.id}
                      className="dash-booking-item"
                      id={`booking-${booking.id}`}
                    >
                      <div className="dash-booking-item__icon" style={{ background: cat?.gradient }}>
                        {CatIcon && <CatIcon size={20} strokeWidth={1.5} />}
                      </div>
                      <div className="dash-booking-item__info">
                        <span className="dash-booking-item__name">{booking.vendorName}</span>
                        <span className="dash-booking-item__detail">
                          {cat?.name} • {booking.notes}
                        </span>
                      </div>
                      <div className="dash-booking-item__right">
                        <Badge variant={booking.status}>
                          {booking.status === 'confirmed' && <CheckCircle2 size={10} />}
                          {booking.status === 'pending' && <Clock size={10} />}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                        <span className="dash-booking-item__price">{booking.totalPrice}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="dash-sidebar">
            {/* Interactive Checklist */}
            <div className="dash-card animate-fade-in-up" id="planning-checklist">
              <div className="dash-card__header">
                <h2>Planning Checklist</h2>
                <span className="dash-checklist-progress">
                  {completedChecklist}/{checklist.length}
                </span>
              </div>
              <div className="dash-checklist-bar">
                <div
                  className="dash-checklist-bar__fill"
                  style={{ '--progress': `${(completedChecklist / checklist.length) * 100}%` }}
                />
              </div>
              <ul className="dash-checklist">
                {checklist.map(item => (
                  <li
                    key={item.id}
                    className={`dash-checklist__item ${item.done ? 'dash-checklist__item--done' : ''}`}
                    onClick={() => dispatch({ type: 'TOGGLE_CHECKLIST_ITEM', payload: item.id })}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        dispatch({ type: 'TOGGLE_CHECKLIST_ITEM', payload: item.id });
                      }
                    }}
                  >
                    <div className="dash-checklist__check">
                      {item.done && <CheckCircle2 size={16} />}
                    </div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Favorites */}
            <div className="dash-card animate-fade-in-up" id="favorites-list">
              <div className="dash-card__header">
                <h2>
                  <Heart size={16} />
                  Saved Vendors
                </h2>
              </div>
              {favVendors.length > 0 ? (
                <div className="dash-favorites-list">
                  {favVendors.map(vendor => {
                    const cat = categories.find(c => c.id === vendor.category);
                    return (
                      <Link to={`/vendors/${vendor.id}`} key={vendor.id} className="dash-fav-item">
                        <div className="dash-fav-item__icon" style={{ background: cat?.gradient }}>
                          {cat?.icon && <cat.icon size={16} strokeWidth={1.5} />}
                        </div>
                        <div className="dash-fav-item__info">
                          <span className="dash-fav-item__name">{vendor.name}</span>
                          <span className="dash-fav-item__cat">{cat?.name}</span>
                        </div>
                        <ChevronRight size={14} className="dash-fav-item__arrow" />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="dash-empty-fav">No saved vendors yet. Browse and ♥ vendors to save them.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  );
}
