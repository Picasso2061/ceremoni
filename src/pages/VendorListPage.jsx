import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal, X, ChevronDown, Grid3X3, List,
  MapPin, Star as StarIcon
} from 'lucide-react';
import VendorCard from '../components/VendorCard';
import SearchBar from '../components/SearchBar';
import vendors from '../data/vendors';
import categories from '../data/categories';
import './VendorListPage.css';

const locations = [...new Set(vendors.map(v => v.location))].sort();
const sortOptions = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Alphabetical' },
];

export default function VendorListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedEventType, setSelectedEventType] = useState(searchParams.get('eventType') || '');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPriceTier, setSelectedPriceTier] = useState('');
  const [minRating, setMinRating] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...vendors];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.shortDesc.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      result = result.filter(v => v.category === selectedCategory);
    }
    if (selectedEventType) {
      result = result.filter(v => v.eventTypes.includes(selectedEventType));
    }
    if (selectedLocation) {
      result = result.filter(v => v.location === selectedLocation);
    }
    if (selectedPriceTier) {
      result = result.filter(v => v.priceTier === Number(selectedPriceTier));
    }
    if (minRating) {
      result = result.filter(v => v.rating >= Number(minRating));
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'price-asc':
        result.sort((a, b) => a.priceTier - b.priceTier);
        break;
      case 'price-desc':
        result.sort((a, b) => b.priceTier - a.priceTier);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [search, selectedCategory, selectedEventType, selectedLocation, selectedPriceTier, minRating, sortBy]);

  const activeFilterCount = [selectedCategory, selectedEventType, selectedLocation, selectedPriceTier, minRating].filter(Boolean).length;

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedEventType('');
    setSelectedLocation('');
    setSelectedPriceTier('');
    setMinRating('');
    setSearch('');
  };

  return (
    <div className="vendor-list-page">
      {/* ── Page Header ── */}
      <section className="vlp-header" id="vendor-list-header">
        <div className="container">
          <h1 className="vlp-header__title animate-fade-in-up">Find Your Perfect Vendors</h1>
          <p className="vlp-header__subtitle animate-fade-in-up animate-delay-1">
            Browse {vendors.length}+ verified professionals across {categories.length} categories
          </p>
          <div className="vlp-header__search animate-fade-in-up animate-delay-2">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by name, category, or location..."
            />
          </div>
        </div>
      </section>

      <div className="container vlp-body">
        {/* ── Filter Toggle (mobile) ── */}
        <button
          className="vlp-filter-toggle btn btn-outline"
          onClick={() => setFiltersOpen(!filtersOpen)}
          id="filter-toggle"
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="vlp-filter-count">{activeFilterCount}</span>
          )}
        </button>

        <div className="vlp-layout">
          {/* ── Sidebar Filters ── */}
          <aside className={`vlp-sidebar ${filtersOpen ? 'vlp-sidebar--open' : ''}`} id="vendor-filters">
            <div className="vlp-sidebar__header">
              <h3>Filters</h3>
              {activeFilterCount > 0 && (
                <button className="vlp-sidebar__clear" onClick={clearAllFilters}>
                  Clear all
                </button>
              )}
              <button
                className="vlp-sidebar__close"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            {/* Event Type */}
            <div className="vlp-filter-group">
              <label className="vlp-filter-label">Event Type</label>
              <div className="vlp-filter-chips">
                <button
                  className={`vlp-chip ${selectedEventType === '' ? 'vlp-chip--active' : ''}`}
                  onClick={() => setSelectedEventType('')}
                >All Events</button>
                <button
                  className={`vlp-chip ${selectedEventType === 'wedding' ? 'vlp-chip--active' : ''}`}
                  onClick={() => setSelectedEventType('wedding')}
                >💍 Wedding</button>
                <button
                  className={`vlp-chip ${selectedEventType === 'burial' ? 'vlp-chip--active' : ''}`}
                  onClick={() => setSelectedEventType('burial')}
                >🕊️ Burial</button>
              </div>
            </div>

            {/* Category */}
            <div className="vlp-filter-group">
              <label className="vlp-filter-label">Category</label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                id="filter-category"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="vlp-filter-group">
              <label className="vlp-filter-label">Location</label>
              <select
                className="form-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                id="filter-location"
              >
                <option value="">All Locations</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Price Tier */}
            <div className="vlp-filter-group">
              <label className="vlp-filter-label">Price Range</label>
              <div className="vlp-filter-chips">
                <button
                  className={`vlp-chip ${selectedPriceTier === '' ? 'vlp-chip--active' : ''}`}
                  onClick={() => setSelectedPriceTier('')}
                >Any</button>
                <button
                  className={`vlp-chip ${selectedPriceTier === '1' ? 'vlp-chip--active' : ''}`}
                  onClick={() => setSelectedPriceTier('1')}
                >$ Budget</button>
                <button
                  className={`vlp-chip ${selectedPriceTier === '2' ? 'vlp-chip--active' : ''}`}
                  onClick={() => setSelectedPriceTier('2')}
                >$$ Mid</button>
                <button
                  className={`vlp-chip ${selectedPriceTier === '3' ? 'vlp-chip--active' : ''}`}
                  onClick={() => setSelectedPriceTier('3')}
                >$$$ Premium</button>
              </div>
            </div>

            {/* Min Rating */}
            <div className="vlp-filter-group">
              <label className="vlp-filter-label">Minimum Rating</label>
              <div className="vlp-filter-chips">
                {['', '4', '4.5', '4.8'].map(r => (
                  <button
                    key={r}
                    className={`vlp-chip ${minRating === r ? 'vlp-chip--active' : ''}`}
                    onClick={() => setMinRating(r)}
                  >
                    {r === '' ? 'Any' : `${r}★+`}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Results ── */}
          <div className="vlp-results" id="vendor-results">
            <div className="vlp-results__header">
              <span className="vlp-results__count">
                {filtered.length} vendor{filtered.length !== 1 ? 's' : ''} found
              </span>
              <div className="vlp-results__sort">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  className="form-select vlp-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {filtered.length > 0 ? (
              <div className="vlp-results__grid">
                {filtered.map(vendor => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            ) : (
              <div className="vlp-empty" id="no-results">
                <div className="vlp-empty__icon">🔍</div>
                <h3>No vendors found</h3>
                <p>Try adjusting your filters or search terms.</p>
                <button className="btn btn-primary" onClick={clearAllFilters}>
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
