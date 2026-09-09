import { useState } from 'react';
import { X, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './ReviewModal.css';

export default function ReviewModal({ isOpen, onClose, vendorId }) {
  const { state, dispatch } = useApp();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState(state.user.name);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    const newReview = {
      id: `r${Date.now()}`,
      vendorId,
      author,
      rating,
      date: new Date().toISOString(),
      comment,
    };

    dispatch({ type: 'ADD_REVIEW', payload: newReview });
    onClose();
    
    // Reset form
    setRating(0);
    setComment('');
  };

  return (
    <div className="review-modal-overlay animate-fade-in">
      <div className="review-modal-content animate-slide-up">
        <button className="review-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
        
        <h2 className="review-modal-title">Write a Review</h2>
        <p className="review-modal-subtitle">Share your experience with this vendor</p>
        
        <form onSubmit={handleSubmit} className="review-modal-form">
          <div className="review-modal-field">
            <label>Your Rating</label>
            <div className="review-modal-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`review-modal-star ${star <= (hoverRating || rating) ? 'review-modal-star--active' : ''}`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star fill={star <= (hoverRating || rating) ? 'currentColor' : 'none'} size={28} />
                </button>
              ))}
            </div>
          </div>

          <div className="review-modal-field">
            <label htmlFor="authorName">Your Name</label>
            <input
              type="text"
              id="authorName"
              className="form-input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="review-modal-field">
            <label htmlFor="reviewComment">Your Review</label>
            <textarea
              id="reviewComment"
              className="form-input"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like about working with them?"
              required
            />
          </div>

          <div className="review-modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
