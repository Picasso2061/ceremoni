import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './AvailabilityCalendar.css';

export default function AvailabilityCalendar({ bookedDates = [], onSelectDate }) {
  // Start calendar at Oct 2026 to match our mock data
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1)); // Month is 0-indexed (9 = Oct)
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    // Need to use local timezone to avoid UTC shift issues
    const d = new Date(year, month, i, 12, 0, 0); 
    days.push(d);
  }

  const isBooked = (date) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return bookedDates.includes(dateStr);
  };

  const handleDateClick = (date) => {
    if (!date || isBooked(date)) return;
    const dateStr = date.toISOString().split('T')[0];
    setSelectedDate(dateStr);
    if (onSelectDate) onSelectDate(dateStr);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="availability-calendar animate-fade-in">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="calendar-nav-btn" aria-label="Previous month">
          <ChevronLeft size={16} />
        </button>
        <span className="calendar-month">{monthNames[month]} {year}</span>
        <button onClick={handleNextMonth} className="calendar-nav-btn" aria-label="Next month">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="calendar-grid">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="calendar-day-header">{d}</div>
        ))}
        {days.map((date, i) => {
          if (!date) return <div key={i} className="calendar-day empty" />;
          const dateStr = date.toISOString().split('T')[0];
          const booked = isBooked(date);
          const selected = selectedDate === dateStr;
          
          return (
            <button
              key={i}
              className={`calendar-day ${booked ? 'booked' : 'available'} ${selected ? 'selected' : ''}`}
              disabled={booked}
              onClick={() => handleDateClick(date)}
              aria-label={`${dateStr} ${booked ? 'Booked' : 'Available'}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
      <div className="calendar-legend">
        <div className="legend-item"><span className="legend-dot available"></span> Available</div>
        <div className="legend-item"><span className="legend-dot booked"></span> Booked</div>
      </div>
    </div>
  );
}
