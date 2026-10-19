import { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, PartyPopper,
  Calendar, Users, DollarSign, Sparkles, Star, MapPin,
  ShieldCheck, Info, ClipboardList, Eye,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import vendors from '../data/vendors';
import categories from '../data/categories';
import './EventPlannerPage.css';

const STEPS = [
  { label: 'Event Details', icon: Calendar },
  { label: 'Categories', icon: ClipboardList },
  { label: 'Vendors', icon: Users },
  { label: 'Review', icon: Eye },
  { label: 'Done', icon: PartyPopper },
];

function Confetti() {
  const pieces = useMemo(() => {
    const colors = ['#D4A754', '#6b3a75', '#3a8a5c', '#c44b4b', '#4b7ec4', '#e8c06a', '#8f5f98'];
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[i % colors.length],
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 2}s`,
      size: `${6 + Math.random() * 8}px`,
      shape: Math.random() > 0.5 ? '50%' : '0',
    }));
  }, []);

  return (
    <div className="ep-confetti" aria-hidden="true">
      {pieces.map(p => (
        <div
          key={p.id}
          className="ep-confetti__piece"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

// ─── Step 1: Event Details ──────────────────────────────────
function StepEventDetails({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value });

  return (
    <>
      <h2 className="planner-step-title animate-fade-in-up">
        <Calendar size={22} />
        Tell us about your event
      </h2>
      <p className="planner-step-desc animate-fade-in-up animate-delay-1">
        Let's start with the basics so we can recommend the perfect vendors for your celebration.
      </p>

      {/* Event Type */}
      <div className="ep-event-type-selector">
        <div
          className={`ep-type-card animate-fade-in-up animate-delay-2 ${data.eventType === 'wedding' ? 'ep-type-card--selected' : ''}`}
          onClick={() => update('eventType', 'wedding')}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); update('eventType', 'wedding'); } }}
          id="ep-type-wedding"
        >
          <span className="ep-type-card__emoji">💍</span>
          <div className="ep-type-card__info">
            <h3>Wedding</h3>
            <p>Your perfect day, expertly planned</p>
          </div>
        </div>
        <div
          className={`ep-type-card animate-fade-in-up animate-delay-3 ${data.eventType === 'burial' ? 'ep-type-card--selected' : ''}`}
          onClick={() => update('eventType', 'burial')}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); update('eventType', 'burial'); } }}
          id="ep-type-burial"
        >
          <span className="ep-type-card__emoji">🕊️</span>
          <div className="ep-type-card__info">
            <h3>Burial Ceremony</h3>
            <p>A respectful, dignified celebration of life</p>
          </div>
        </div>
      </div>

      {/* Event Title */}
      <div className="form-group animate-fade-in-up animate-delay-3">
        <label className="form-label" htmlFor="ep-event-title">Event Title</label>
        <input
          type="text"
          className="form-input"
          id="ep-event-title"
          value={data.title}
          onChange={e => update('title', e.target.value)}
          placeholder="e.g. Chioma & David's Wedding"
        />
      </div>

      <div className="ep-form-row">
        <div className="form-group animate-fade-in-up animate-delay-4">
          <label className="form-label" htmlFor="ep-event-date">Event Date</label>
          <input
            type="date"
            className="form-input"
            id="ep-event-date"
            value={data.date}
            onChange={e => update('date', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="form-group animate-fade-in-up animate-delay-5">
          <label className="form-label" htmlFor="ep-guest-count">Guest Count</label>
          <input
            type="number"
            className="form-input"
            id="ep-guest-count"
            value={data.guestCount}
            onChange={e => update('guestCount', e.target.value)}
            placeholder="e.g. 300"
            min="1"
          />
        </div>
      </div>

      {/* Budget */}
      <div className="form-group animate-fade-in-up animate-delay-6">
        <label className="form-label" htmlFor="ep-budget">Budget</label>
        <input
          type="range"
          id="ep-budget"
          className="ep-budget-slider"
          min="500000"
          max="50000000"
          step="500000"
          value={data.budget}
          onChange={e => update('budget', Number(e.target.value))}
        />
        <div className="ep-budget-display">
          <span>₦500,000</span>
          <strong>₦{Number(data.budget).toLocaleString()}</strong>
          <span>₦50,000,000</span>
        </div>
      </div>
    </>
  );
}

// ─── Step 2: Category Selection ─────────────────────────────
function StepCategories({ data, onChange, eventType }) {
  const available = categories.filter(c => c.eventTypes.includes(eventType));

  const toggle = (catId) => {
    const set = new Set(data.selectedCategories);
    set.has(catId) ? set.delete(catId) : set.add(catId);
    onChange({ ...data, selectedCategories: [...set] });
  };

  return (
    <>
      <h2 className="planner-step-title animate-fade-in-up">
        <ClipboardList size={22} />
        What do you need?
      </h2>
      <p className="planner-step-desc animate-fade-in-up animate-delay-1">
        Select the vendor categories you need for your event. You can always add more later.
      </p>

      <div className="ep-info-pill animate-fade-in-up animate-delay-1">
        <Info size={14} />
        Tap any category to add it to your plan
      </div>

      <div className="ep-category-grid">
        {available.map((cat, i) => {
          const CatIcon = cat.icon;
          const selected = data.selectedCategories.includes(cat.id);
          return (
            <div
              key={cat.id}
              className={`ep-cat-card animate-fade-in-up animate-delay-${Math.min(i + 2, 8)} ${selected ? 'ep-cat-card--selected' : ''}`}
              onClick={() => toggle(cat.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(cat.id); } }}
              id={`ep-cat-${cat.id}`}
            >
              <div className="ep-cat-check">
                <Check size={14} />
              </div>
              <div className="ep-cat-card__icon" style={{ background: cat.gradient }}>
                <CatIcon size={24} strokeWidth={1.5} />
              </div>
              <span className="ep-cat-card__name">{cat.name}</span>
              <span className="ep-cat-card__count">{cat.count} vendors</span>
            </div>
          );
        })}
      </div>

      <p className="ep-cat-hint animate-fade-in-up animate-delay-8">
        {data.selectedCategories.length === 0
          ? 'Select at least one category to continue'
          : `${data.selectedCategories.length} ${data.selectedCategories.length === 1 ? 'category' : 'categories'} selected`}
      </p>
    </>
  );
}

// ─── Step 3: Vendor Selection ───────────────────────────────
function StepVendors({ data, onChange, eventType }) {
  const toggle = (vendorId) => {
    const set = new Set(data.selectedVendors);
    set.has(vendorId) ? set.delete(vendorId) : set.add(vendorId);
    onChange({ ...data, selectedVendors: [...set] });
  };

  return (
    <>
      <h2 className="planner-step-title animate-fade-in-up">
        <Sparkles size={22} />
        Choose your dream team
      </h2>
      <p className="planner-step-desc animate-fade-in-up animate-delay-1">
        Browse and select vendors for each category. Pick the ones that speak to your vision.
      </p>

      {data.selectedCategories.map(catId => {
        const cat = categories.find(c => c.id === catId);
        if (!cat) return null;
        const CatIcon = cat.icon;
        const catVendors = vendors.filter(v => v.category === catId && v.eventTypes.includes(eventType));

        return (
          <div key={catId} className="ep-vendor-section animate-fade-in-up">
            <div className="ep-vendor-section__header">
              <div className="ep-vendor-section__icon" style={{ background: cat.gradient }}>
                <CatIcon size={18} strokeWidth={1.5} />
              </div>
              <span className="ep-vendor-section__title">{cat.name}</span>
              <span className="ep-vendor-section__count">{catVendors.length} available</span>
            </div>

            <div className="ep-vendor-list">
              {catVendors.map(vendor => {
                const isSelected = data.selectedVendors.includes(vendor.id);
                const startingPrice = vendor.services?.[0]?.price || 'Contact for price';
                return (
                  <div
                    key={vendor.id}
                    className={`ep-vendor-row ${isSelected ? 'ep-vendor-row--selected' : ''}`}
                    onClick={() => toggle(vendor.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(vendor.id); } }}
                    id={`ep-vendor-${vendor.id}`}
                  >
                    <img
                      src={vendor.coverImage}
                      alt={vendor.name}
                      className="ep-vendor-row__img"
                      loading="lazy"
                    />
                    <div className="ep-vendor-row__info">
                      <div className="ep-vendor-row__name">
                        {vendor.name}
                        {vendor.verified && <ShieldCheck size={13} style={{ color: 'var(--color-success)' }} />}
                      </div>
                      <div className="ep-vendor-row__meta">
                        <span className="ep-vendor-row__rating">
                          <Star size={12} fill="currentColor" />
                          {vendor.rating}
                        </span>
                        <span>
                          <MapPin size={11} /> {vendor.location}
                        </span>
                      </div>
                    </div>
                    <span className="ep-vendor-row__price">From {startingPrice}</span>
                    <div className="ep-vendor-row__check">
                      <Check size={16} />
                    </div>
                  </div>
                );
              })}

              {catVendors.length === 0 && (
                <div className="ep-vendor-skip">
                  No vendors available for this event type
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

// ─── Step 4: Review ─────────────────────────────────────────
function StepReview({ data }) {
  const selectedVendorObjects = vendors.filter(v => data.selectedVendors.includes(v.id));

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-NG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <h2 className="planner-step-title animate-fade-in-up">
        <Eye size={22} />
        Review your event plan
      </h2>
      <p className="planner-step-desc animate-fade-in-up animate-delay-1">
        Double-check everything before we save your plan and send quote requests to your selected vendors.
      </p>

      {/* Event Summary */}
      <div className="ep-review-event animate-fade-in-up animate-delay-2">
        <h3 className="ep-review-event__title">
          {data.title || 'My Event'}
        </h3>
        <div className="ep-review-event__grid">
          <div className="ep-review-event__item">
            <span className="ep-review-event__label">Type</span>
            <span className="ep-review-event__value">
              {data.eventType === 'wedding' ? '💍 Wedding' : '🕊️ Burial'}
            </span>
          </div>
          <div className="ep-review-event__item">
            <span className="ep-review-event__label">Date</span>
            <span className="ep-review-event__value">{formatDate(data.date)}</span>
          </div>
          <div className="ep-review-event__item">
            <span className="ep-review-event__label">Guests</span>
            <span className="ep-review-event__value">{data.guestCount || '—'}</span>
          </div>
          <div className="ep-review-event__item">
            <span className="ep-review-event__label">Budget</span>
            <span className="ep-review-event__value">₦{Number(data.budget).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Selected Vendors */}
      <div className="ep-review-vendors animate-fade-in-up animate-delay-3">
        <h3>
          <Users size={16} />
          Selected Vendors ({selectedVendorObjects.length})
        </h3>
        {selectedVendorObjects.length > 0 ? (
          selectedVendorObjects.map(vendor => {
            const cat = categories.find(c => c.id === vendor.category);
            const CatIcon = cat?.icon;
            return (
              <div key={vendor.id} className="ep-review-vendor-card">
                <div className="ep-review-vendor-card__icon" style={{ background: cat?.gradient }}>
                  {CatIcon && <CatIcon size={18} strokeWidth={1.5} />}
                </div>
                <div className="ep-review-vendor-card__info">
                  <div className="ep-review-vendor-card__name">{vendor.name}</div>
                  <div className="ep-review-vendor-card__cat">{cat?.name} • {vendor.location}</div>
                </div>
                <span className="ep-review-vendor-card__price">
                  {vendor.services?.[0]?.price || '—'}
                </span>
              </div>
            );
          })
        ) : (
          <div className="ep-review-empty">
            <Users size={32} />
            <p>No vendors selected yet</p>
            <p>Go back to step 3 to pick vendors</p>
          </div>
        )}
      </div>

      {/* Categories without vendors */}
      {data.selectedCategories
        .filter(catId => !selectedVendorObjects.some(v => v.category === catId))
        .length > 0 && (
        <div className="ep-info-pill animate-fade-in-up animate-delay-4" style={{ marginTop: 'var(--space-4)' }}>
          <Info size={14} />
          {data.selectedCategories.filter(catId => !selectedVendorObjects.some(v => v.category === catId)).length} {data.selectedCategories.filter(catId => !selectedVendorObjects.some(v => v.category === catId)).length === 1 ? 'category has' : 'categories have'} no vendor selected — you can add them later
        </div>
      )}
    </>
  );
}

// ─── Step 5: Success ────────────────────────────────────────
function StepSuccess({ data }) {
  const vendorCount = data.selectedVendors.length;

  return (
    <>
      <Confetti />
      <div className="ep-success">
        <div className="ep-success__icon">
          <PartyPopper size={36} />
        </div>
        <h2 className="ep-success__title animate-fade-in-up animate-delay-1">
          Your event plan is ready! 🎉
        </h2>
        <p className="ep-success__desc animate-fade-in-up animate-delay-2">
          {vendorCount > 0
            ? `We've saved your plan and queued quote requests for ${vendorCount} ${vendorCount === 1 ? 'vendor' : 'vendors'}. They'll respond within 24–48 hours.`
            : `Your event details have been saved. Head to the marketplace to start booking vendors whenever you're ready.`}
        </p>
        <div className="ep-success__actions animate-fade-in-up animate-delay-3">
          <Link to="/customer" className="btn btn-accent btn-lg" id="ep-go-dashboard">
            View Dashboard
          </Link>
          <Link to="/vendors" className="btn btn-outline btn-lg" id="ep-browse-vendors">
            Browse Vendors
          </Link>
        </div>
      </div>
    </>
  );
}

// ─── Main Planner Component ─────────────────────────────────
export default function EventPlannerPage() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    eventType: 'wedding',
    title: '',
    date: '',
    guestCount: '',
    budget: 5000000,
    selectedCategories: [],
    selectedVendors: [],
  });

  const canProceed = useCallback(() => {
    switch (step) {
      case 0: return data.date && data.guestCount;
      case 1: return data.selectedCategories.length > 0;
      case 2: return true; // vendors are optional per category
      case 3: return true;
      default: return false;
    }
  }, [step, data]);

  const handleNext = () => {
    if (step === 3) {
      // Finalize — save event and bookings to state
      dispatch({
        type: 'UPDATE_EVENT',
        payload: {
          type: data.eventType,
          title: data.title || `My ${data.eventType === 'wedding' ? 'Wedding' : 'Ceremony'}`,
          date: data.date,
          guestCount: Number(data.guestCount),
          budget: data.budget,
        },
      });

      // Create bookings for selected vendors
      data.selectedVendors.forEach(vendorId => {
        const vendor = vendors.find(v => v.id === vendorId);
        if (!vendor) return;
        dispatch({
          type: 'ADD_BOOKING',
          payload: {
            id: 'b' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
            vendorId: vendor.id,
            vendorName: vendor.name,
            category: vendor.category,
            eventType: data.eventType,
            eventDate: data.date,
            status: 'pending',
            totalPrice: vendor.services?.[0]?.price || 'Quote Pending',
            notes: `${data.guestCount} guests — via Event Planner`,
            createdAt: new Date().toISOString().split('T')[0],
          },
        });
      });

      // Update checklist items based on selected categories
      const catChecklistMap = {
        venues: 'ck1',
        photography: 'ck2',
        catering: 'ck3',
        decor: 'ck4',
        music: 'ck5',
        mc: 'ck6',
        transport: 'ck7',
        attire: 'ck8',
      };
      data.selectedVendors.forEach(vendorId => {
        const vendor = vendors.find(v => v.id === vendorId);
        if (!vendor) return;
        const checkId = catChecklistMap[vendor.category];
        if (checkId) {
          dispatch({ type: 'TOGGLE_CHECKLIST_ITEM', payload: checkId });
        }
      });

      setStep(4);
      return;
    }
    setStep(s => Math.min(s + 1, 4));
  };

  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0: return <StepEventDetails data={data} onChange={setData} />;
      case 1: return <StepCategories data={data} onChange={setData} eventType={data.eventType} />;
      case 2: return <StepVendors data={data} onChange={setData} eventType={data.eventType} />;
      case 3: return <StepReview data={data} />;
      case 4: return <StepSuccess data={data} />;
      default: return null;
    }
  };

  return (
    <div className="planner-page">
      {/* ── Header with stepper ── */}
      <section className="planner-header">
        <div className="container">
          <div className="planner-header__top animate-fade-in">
            <Link to="/customer" className="planner-back-btn">
              <ArrowLeft size={16} />
              Dashboard
            </Link>
          </div>

          <div className="planner-header__content">
            <h1 className="planner-header__title animate-fade-in-up">
              {step < 4 ? 'Plan Your Event' : 'All Set!'}
            </h1>
            <p className="planner-header__subtitle animate-fade-in-up animate-delay-1">
              {step < 4
                ? 'A guided, step-by-step journey to your perfect celebration'
                : 'Your celebration is taking shape'}
            </p>
          </div>

          {/* Progress Stepper */}
          <div className="planner-stepper animate-fade-in-up animate-delay-2" id="ep-stepper">
            {STEPS.map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                <div className={`planner-step planner-step--${i < step ? 'completed' : i === step ? 'active' : 'upcoming'}`}>
                  <div className="planner-step__circle">
                    {i < step ? <Check size={18} /> : i + 1}
                  </div>
                  <span className="planner-step__label">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`planner-step__connector ${i < step ? 'planner-step__connector--filled' : ''}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Card Body ── */}
      <div className="container planner-body">
        <div className="planner-card" key={step}>
          {renderStep()}

          {/* Navigation buttons */}
          {step < 4 && (
            <div className="planner-nav">
              {step > 0 ? (
                <button className="planner-nav__back" onClick={handleBack} id="ep-nav-back">
                  <ArrowLeft size={16} />
                  Back
                </button>
              ) : (
                <span />
              )}
              <button
                className={`planner-nav__next ${step === 3 ? 'planner-nav__next--accent' : ''}`}
                onClick={handleNext}
                disabled={!canProceed()}
                id="ep-nav-next"
              >
                {step === 3 ? (
                  <>
                    <Sparkles size={16} />
                    Confirm & Send Requests
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
