import { Star, StarHalf } from 'lucide-react';
import './StarRating.css';

export default function StarRating({ rating, size = 16, showValue = false, reviewCount }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="star-rating">
      <div className="star-rating__stars">
        {Array.from({ length: fullStars }, (_, i) => (
          <Star key={`full-${i}`} size={size} className="star-filled" />
        ))}
        {hasHalf && <StarHalf size={size} className="star-filled" />}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Star key={`empty-${i}`} size={size} className="star-empty" />
        ))}
      </div>
      {showValue && <span className="star-rating__value">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className="star-rating__count">({reviewCount})</span>
      )}
    </div>
  );
}
