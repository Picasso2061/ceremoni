import { X, MapPin, ShieldCheck, Star, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StarRating from './StarRating';
import Badge from './Badge';
import vendors from '../data/vendors';
import categories from '../data/categories';
import './CompareModal.css';

export default function CompareModal({ onClose }) {
  const { state, dispatch } = useApp();
  const { compareList } = state;

  const compareVendors = compareList
    .map(id => vendors.find(v => v.id === id))
    .filter(Boolean);

  if (compareVendors.length < 2) return null;

  const priceTierLabel = (tier) => ['', 'Budget-Friendly', 'Mid-Range', 'Premium'][tier] || '';
  const priceTierSymbol = (tier) => '$'.repeat(tier);

  // Gather all unique services across vendors
  const allServiceNames = [...new Set(compareVendors.flatMap(v => v.services.map(s => s.name)))];

  return (
    <div className="compare-modal-overlay" onClick={onClose} id="compare-modal">
      <div className="compare-modal" onClick={e => e.stopPropagation()}>
        <div className="compare-modal__header">
          <h2>Compare Vendors</h2>
          <button className="compare-modal__close" onClick={onClose} aria-label="Close comparison">
            <X size={22} />
          </button>
        </div>

        <div className="compare-modal__body">
          <div className="compare-table" style={{ '--col-count': compareVendors.length }}>
            {/* Row: Vendor Names */}
            <div className="compare-table__row compare-table__row--header">
              <div className="compare-table__label">Vendor</div>
              {compareVendors.map(v => {
                const cat = categories.find(c => c.id === v.category);
                const CatIcon = cat?.icon;
                return (
                  <div key={v.id} className="compare-table__cell compare-table__cell--vendor">
                    <div className="compare-vendor-header" style={{ borderColor: `${cat?.gradient?.split(',')[1]?.trim()?.replace(')', '') || 'var(--color-accent-400)'}` }}>
                      <h3>{v.name}</h3>
                      <div className="compare-vendor-badges">
                        <Badge variant="category">
                          {CatIcon && <CatIcon size={11} />}
                          {cat?.name}
                        </Badge>
                        {v.verified && (
                          <Badge variant="verified">
                            <ShieldCheck size={11} />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Row: Rating */}
            <div className="compare-table__row">
              <div className="compare-table__label">Rating</div>
              {compareVendors.map(v => (
                <div key={v.id} className="compare-table__cell">
                  <StarRating rating={v.rating} size={14} showValue reviewCount={v.reviewCount} />
                </div>
              ))}
            </div>

            {/* Row: Location */}
            <div className="compare-table__row">
              <div className="compare-table__label">Location</div>
              {compareVendors.map(v => (
                <div key={v.id} className="compare-table__cell">
                  <span className="compare-cell-inline">
                    <MapPin size={13} />
                    {v.location}
                  </span>
                </div>
              ))}
            </div>

            {/* Row: Price Tier */}
            <div className="compare-table__row">
              <div className="compare-table__label">Price Tier</div>
              {compareVendors.map(v => (
                <div key={v.id} className="compare-table__cell">
                  <span className="compare-price-tier">
                    <span className="compare-price-symbol">{priceTierSymbol(v.priceTier)}</span>
                    {priceTierLabel(v.priceTier)}
                  </span>
                </div>
              ))}
            </div>

            {/* Row: Experience */}
            <div className="compare-table__row">
              <div className="compare-table__label">Experience</div>
              {compareVendors.map(v => (
                <div key={v.id} className="compare-table__cell">
                  <span className="compare-cell-inline">
                    <Clock size={13} />
                    {v.yearsExperience} years
                  </span>
                </div>
              ))}
            </div>

            {/* Row: Event Types */}
            <div className="compare-table__row">
              <div className="compare-table__label">Event Types</div>
              {compareVendors.map(v => (
                <div key={v.id} className="compare-table__cell">
                  <div className="compare-event-types">
                    {v.eventTypes.map(et => (
                      <Badge key={et} variant={et}>
                        {et === 'wedding' ? '💍 Wedding' : '🕊️ Burial'}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Section: Services */}
            <div className="compare-table__row compare-table__row--section">
              <div className="compare-table__label">Services & Pricing</div>
              {compareVendors.map(v => (
                <div key={v.id} className="compare-table__cell" />
              ))}
            </div>

            {allServiceNames.map(serviceName => (
              <div key={serviceName} className="compare-table__row compare-table__row--service">
                <div className="compare-table__label compare-table__label--service">{serviceName}</div>
                {compareVendors.map(v => {
                  const svc = v.services.find(s => s.name === serviceName);
                  return (
                    <div key={v.id} className="compare-table__cell">
                      {svc ? (
                        <span className="compare-service-price">{svc.price}</span>
                      ) : (
                        <span className="compare-service-na">—</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="compare-modal__footer">
          <button className="btn btn-ghost" onClick={() => { dispatch({ type: 'CLEAR_COMPARE' }); onClose(); }}>
            Clear All
          </button>
          <button className="btn btn-accent" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
