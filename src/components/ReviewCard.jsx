import StarRating from './StarRating';
import { User } from 'lucide-react';
import './ReviewCard.css';

export default function ReviewCard({ review }) {
  const initials = review.author
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="review-card animate-fade-in-up">
      <div className="review-card__header">
        <div className="review-card__avatar">
          <span>{initials}</span>
        </div>
        <div className="review-card__info">
          <span className="review-card__author">{review.author}</span>
          <span className="review-card__date">
            {new Date(review.date).toLocaleDateString('en-NG', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        <div className="review-card__rating">
          <StarRating rating={review.rating} size={14} />
        </div>
      </div>
      <p className="review-card__comment">{review.comment}</p>
    </div>
  );
}
