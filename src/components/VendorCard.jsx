import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Heart } from 'lucide-react';
import StarRating from './StarRating';
import Badge from './Badge';
import { useApp } from '../context/AppContext';
import categories from '../data/categories';
import './VendorCard.css';

export default function VendorCard({ vendor }) {
  const { state, dispatch } = useApp();
  const isFav = state.favorites.includes(vendor.id);
  const cat = categories.find(c => c.id === vendor.category);
  const CatIcon = cat?.icon;

  const priceTierLabel = ['', 'Budget-Friendly', 'Mid-Range', 'Premium'][vendor.priceTier] || '';

  const hasImage = vendor.coverImage;

  return (
    <Link to={`/vendors/${vendor.id}`} className="vendor-card card animate-fade-in-up" id={`vendor-card-${vendor.id}`}>
      <div
        className="vendor-card__image"
        style={
          hasImage
            ? {
                backgroundImage: `url(${vendor.coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : { background: cat?.gradient }
        }
      >
        {/* Fallback icon only when no image */}
        {!hasImage && (
          <div className="vendor-card__image-content">
            {CatIcon && <CatIcon size={48} strokeWidth={1} />}
            <span className="vendor-card__category-name">{cat?.name}</span>
          </div>
        )}
        <button
          className={`vendor-card__fav ${isFav ? 'vendor-card__fav--active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({ type: 'TOGGLE_FAVORITE', payload: vendor.id });
          }}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
        </button>
        {vendor.verified && (
          <div className="vendor-card__verified-badge">
            <ShieldCheck size={14} />
            Verified
          </div>
        )}
      </div>
      <div className="vendor-card__body">
        <div className="vendor-card__header">
          <h3 className="vendor-card__name">{vendor.name}</h3>
          <Badge variant="category">
            {CatIcon && <CatIcon size={11} />}
            {cat?.name}
          </Badge>
        </div>
        <p className="vendor-card__desc">{vendor.shortDesc}</p>
        <div className="vendor-card__meta">
          <div className="vendor-card__location">
            <MapPin size={14} />
            <span>{vendor.location}</span>
          </div>
          <span className="vendor-card__price">{priceTierLabel}</span>
        </div>
        <div className="vendor-card__footer">
          <StarRating rating={vendor.rating} size={14} showValue reviewCount={vendor.reviewCount} />
        </div>
      </div>
    </Link>
  );
}
