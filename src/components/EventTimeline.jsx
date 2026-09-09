import { Calendar, CheckCircle2, Circle, MapPin } from 'lucide-react';
import categories from '../data/categories';
import './EventTimeline.css';

const milestones = [
  { id: 'm1', label: 'Book Venue', weeksBefore: 20, icon: '🏛️' },
  { id: 'm2', label: 'Hire Photographer', weeksBefore: 16, icon: '📷' },
  { id: 'm3', label: 'Confirm Catering', weeksBefore: 12, icon: '🍽️' },
  { id: 'm4', label: 'Décor & Florals', weeksBefore: 8, icon: '🌸' },
  { id: 'm5', label: 'Book Music/DJ', weeksBefore: 6, icon: '🎵' },
  { id: 'm6', label: 'Final Fittings', weeksBefore: 3, icon: '👗' },
  { id: 'm7', label: 'Rehearsal', weeksBefore: 1, icon: '🎯' },
  { id: 'm8', label: 'Event Day!', weeksBefore: 0, icon: '✨' },
];

export default function EventTimeline({ eventDate, bookings = [] }) {
  const now = new Date();
  const event = new Date(eventDate);
  const totalWeeks = Math.max(1, Math.ceil((event - new Date(event.getFullYear(), event.getMonth() - 5, event.getDate())) / (1000 * 60 * 60 * 24 * 7)));
  const weeksUntil = Math.max(0, Math.ceil((event - now) / (1000 * 60 * 60 * 24 * 7)));
  const daysUntil = Math.max(0, Math.ceil((event - now) / (1000 * 60 * 60 * 24)));

  return (
    <div className="event-timeline" id="event-timeline">
      {/* Countdown */}
      <div className="timeline-countdown">
        <div className="timeline-countdown__ring">
          <svg viewBox="0 0 100 100" className="timeline-countdown__svg">
            <circle cx="50" cy="50" r="42" className="timeline-countdown__track" />
            <circle
              cx="50" cy="50" r="42"
              className="timeline-countdown__fill"
              style={{
                '--progress': `${Math.max(0, 1 - weeksUntil / 24) * 264}`
              }}
            />
          </svg>
          <div className="timeline-countdown__center">
            <span className="timeline-countdown__number">{daysUntil}</span>
            <span className="timeline-countdown__unit">days left</span>
          </div>
        </div>
        <div className="timeline-countdown__info">
          <span className="timeline-countdown__weeks">{weeksUntil} weeks to go</span>
          <span className="timeline-countdown__date">
            <Calendar size={14} />
            {event.toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="timeline-track">
        {milestones.map((ms, idx) => {
          const isPast = weeksUntil <= ms.weeksBefore ? false : true;
          const isCurrent = !isPast && (idx === milestones.length - 1 || weeksUntil > milestones[idx + 1]?.weeksBefore);
          
          // Check if there's a booking for this milestone
          const relatedBooking = bookings.find(b => {
            if (ms.label.toLowerCase().includes('venue') && b.category === 'venues') return true;
            if (ms.label.toLowerCase().includes('photographer') && b.category === 'photography') return true;
            if (ms.label.toLowerCase().includes('catering') && b.category === 'catering') return true;
            if (ms.label.toLowerCase().includes('music') && b.category === 'music') return true;
            if (ms.label.toLowerCase().includes('décor') && b.category === 'decor') return true;
            return false;
          });

          return (
            <div
              key={ms.id}
              className={`timeline-milestone ${isPast ? 'timeline-milestone--done' : ''} ${isCurrent ? 'timeline-milestone--current' : ''}`}
            >
              <div className="timeline-milestone__marker">
                {isPast ? (
                  <CheckCircle2 size={20} />
                ) : isCurrent ? (
                  <div className="timeline-milestone__pulse" />
                ) : (
                  <Circle size={16} />
                )}
              </div>
              <div className="timeline-milestone__content">
                <span className="timeline-milestone__icon">{ms.icon}</span>
                <span className="timeline-milestone__label">{ms.label}</span>
                {ms.weeksBefore > 0 && (
                  <span className="timeline-milestone__weeks">
                    {ms.weeksBefore}w before
                  </span>
                )}
                {relatedBooking && (
                  <span className="timeline-milestone__booked">
                    <CheckCircle2 size={10} />
                    {relatedBooking.vendorName}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
