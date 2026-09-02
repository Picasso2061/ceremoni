import { useState, useRef, useEffect } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Search vendors...' }) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  return (
    <div className={`search-bar ${isFocused ? 'search-bar--focused' : ''}`} id="search-bar">
      <div className="search-bar__icon">
        <Search size={18} />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        id="search-bar-input"
      />
      {value && (
        <button
          className="search-bar__clear"
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
