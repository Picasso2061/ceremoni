import { useParams, Link } from 'react-router-dom';
import {
  MapPin, ShieldCheck, Clock, Phone, Mail, Globe2,
  Link2, Globe, ArrowLeft, Heart, Share2, Calendar,
  Star as StarIcon, ChevronRight, MessageSquare
} from 'lucide-react';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import Badge from '../components/Badge';
import { useApp } from '../context/AppContext';
import vendors from '../data/vendors';
import reviews from '../data/reviews';
import categories from '../data/categories';
import './VendorProfilePage.css';

export default function VendorProfilePage() {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const vendor = vendors.find(v => v.id === id);
  const vendorReviews = reviews.filter(r => r.vendorId === id);
  const cat = categories.find(c => c.id === vendor?.category);
  const CatIcon = cat?.icon;
  const isFav = state.favorites.includes(id);

  if (!vendor) {
    return (
      <div className="vpp-not-found">
        <div className="container">
          <h2>Vendor not found</h2>
          <p>The vendor you're looking for doesn't exist.</p>
          <Link to="/vendors" className="btn btn-primary">Browse Vendors</Link>
        </div>
      </div>
    );
  }

  const priceTierLabel = ['', 'Budget-Friendly', 'Mid-Range', 'Premium'][vendor.priceTier] || '';
  const priceTierSymbol = '$'.repeat(vendor.priceTier);

  // Rating breakdown (simulated)
  const ratingBreakdown = [5, 4, 3, 2, 1].map(star => {
    const count = vendorReviews.filter(r => r.rating === star).length;
    const pct = vendorReviews.length > 0 ? (count / vendorReviews.length) * 100 : 0;
    return { star, count, pct };
  });

  return (
    <div className="vendor-profile-page">
      {/* ── Cover Banner ── */}
      <section className="vpp-cover" style={{ background: cat?.gradient }} id="vendor-cover">
        <div className="vpp-cover__overlay" />
        <div className="vpp-cover__content">
          {CatIcon && <CatIcon size={64} strokeWidth={0.8} />}
        </div>
      </section>

      <div className="container vpp-body">
        {/* ── Breadcrumb ── */}
        <nav className="vpp-breadcrumb animate-fade-in" id="vendor-breadcrumb">
          <Link to="/vendors">
            <ArrowLeft size={14} />
            All Vendors
          </Link>
          <ChevronRight size={14} />
          <span>{cat?.name}</span>
          <ChevronRight size={14} />
          <span className="vpp-breadcrumb__current">{vendor.name}</span>
        </nav>

        <div className="vpp-layout">
          {/* ── Main Content ── */}
          <div className="vpp-main">
            {/* Info Header */}
            <div className="vpp-info-card animate-fade-in-up" id="vendor-info">
              <div className="vpp-info-card__top">
                <div className="vpp-info-card__left">
                  <div className="vpp-info-card__badges">
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
                    {vendor.priceTier === 3 && (
                      <Badge variant="premium">Premium</Badge>
                    )}
                  </div>
                  <h1 className="vpp-info-card__name">{vendor.name}</h1>
                  <div className="vpp-info-card__meta">
                    <span className="vpp-info-card__location">
                      <MapPin size={14} />
                      {vendor.location}
                    </span>
                    <span className="vpp-info-card__experience">
                      <Clock size={14} />
                      {vendor.yearsExperience} years experience
                    </span>
                  </div>
                  <div className="vpp-info-card__rating">
                    <StarRating rating={vendor.rating} size={18} showValue reviewCount={vendor.reviewCount} />
                    <span className="vpp-info-card__price">{priceTierSymbol} {priceTierLabel}</span>
                  </div>
                </div>
                <div className="vpp-info-card__actions">
                  <button
                    className={`btn btn-icon vpp-fav-btn ${isFav ? 'vpp-fav-btn--active' : ''}`}
                    onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: vendor.id })}
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    id="vendor-fav-btn"
                  >
                    <Heart size={20} fill={isFav ? 'currentColor' : 'none'} />
                  </button>
                  <button className="btn btn-icon" aria-label="Share" id="vendor-share-btn">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              <div className="vpp-info-card__event-types">
                {vendor.eventTypes.map(et => (
                  <Badge key={et} variant={et}>
                    {et === 'wedding' ? '💍 Wedding' : '🕊️ Burial'}
                  </Badge>
                ))}
              </div>
            </div>

            {/* About */}
            <section className="vpp-section animate-fade-in-up" id="vendor-about">
              <h2 className="vpp-section__title">About</h2>
              <p className="vpp-about__text">{vendor.description}</p>
            </section>

            {/* Services & Pricing */}
            <section className="vpp-section animate-fade-in-up" id="vendor-services">
              <h2 className="vpp-section__title">Services & Pricing</h2>
              <div className="vpp-services-table">
                <div className="vpp-services-table__header">
                  <span>Service</span>
                  <span>Price</span>
                </div>
                {vendor.services.map((svc, i) => (
                  <div key={i} className="vpp-services-table__row">
                    <span className="vpp-services-table__name">{svc.name}</span>
                    <span className="vpp-services-table__price">{svc.price}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="vpp-section animate-fade-in-up" id="vendor-reviews">
              <h2 className="vpp-section__title">
                Reviews
                <span className="vpp-section__count">({vendorReviews.length})</span>
              </h2>

              {/* Rating Summary */}
              <div className="vpp-rating-summary">
                <div className="vpp-rating-summary__big">
                  <span className="vpp-rating-summary__number">{vendor.rating.toFixed(1)}</span>
                  <StarRating rating={vendor.rating} size={16} />
                  <span className="vpp-rating-summary__total">{vendor.reviewCount} reviews</span>
                </div>
                <div className="vpp-rating-summary__bars">
                  {ratingBreakdown.map(({ star, count, pct }) => (
                    <div key={star} className="vpp-rating-bar">
                      <span className="vpp-rating-bar__label">{star}★</span>
                      <div className="vpp-rating-bar__track">
                        <div
                          className="vpp-rating-bar__fill"
                          style={{ '--progress': `${pct}%` }}
                        />
                      </div>
                      <span className="vpp-rating-bar__count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review List */}
              <div className="vpp-reviews-list">
                {vendorReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
                {vendorReviews.length === 0 && (
                  <p className="vpp-no-reviews">No reviews yet for this vendor.</p>
                )}
              </div>
            </section>
          </div>

          {/* ── Sticky Sidebar ── */}
          <aside className="vpp-sidebar" id="vendor-sidebar">
            <div className="vpp-booking-card glass-card">
              <h3 className="vpp-booking-card__title">Book This Vendor</h3>
              <p className="vpp-booking-card__price">
                Starting from <strong>{vendor.services[0]?.price}</strong>
              </p>
              <Link
                to={`/booking/${vendor.id}`}
                className="btn btn-accent btn-lg vpp-booking-card__btn"
                id="book-vendor-btn"
              >
                <Calendar size={18} />
                Request a Quote
              </Link>
              <Link
                to={`/booking/${vendor.id}`}
                className="btn btn-outline vpp-booking-card__btn"
                id="message-vendor-btn"
              >
                <MessageSquare size={18} />
                Send a Message
              </Link>
              <div className="vpp-booking-card__divider" />
              <div className="vpp-booking-card__contact">
                <h4>Contact Info</h4>
                <a href={`tel:${vendor.contact.phone}`} className="vpp-contact-item">
                  <Phone size={14} />
                  {vendor.contact.phone}
                </a>
                <a href={`mailto:${vendor.contact.email}`} className="vpp-contact-item">
                  <Mail size={14} />
                  {vendor.contact.email}
                </a>
              </div>
              {Object.keys(vendor.socialLinks).length > 0 && (
                <div className="vpp-booking-card__social">
                  {vendor.socialLinks.instagram && (
                    <a href={vendor.socialLinks.instagram} className="vpp-social-link" aria-label="Instagram">
                      <Instagram size={18} />
                    </a>
                  )}
                  {vendor.socialLinks.facebook && (
                    <a href={vendor.socialLinks.facebook} className="vpp-social-link" aria-label="Facebook">
                      <Facebook size={18} />
                    </a>
                  )}
                  {vendor.socialLinks.website && (
                    <a href={vendor.socialLinks.website} className="vpp-social-link" aria-label="Website">
                      <Globe size={18} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
