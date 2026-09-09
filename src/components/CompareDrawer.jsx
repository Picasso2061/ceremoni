import { Link } from 'react-router-dom';
import { X, ArrowRight, GitCompareArrows } from 'lucide-react';
import { useApp } from '../context/AppContext';
import vendors from '../data/vendors';
import categories from '../data/categories';
import './CompareDrawer.css';

export default function CompareDrawer({ onCompare }) {
  const { state, dispatch } = useApp();
  const { compareList } = state;

  if (compareList.length === 0) return null;

  const compareVendors = compareList
    .map(id => vendors.find(v => v.id === id))
    .filter(Boolean);

  return (
    <div className="compare-drawer animate-slide-up" id="compare-drawer">
      <div className="container compare-drawer__inner">
        <div className="compare-drawer__info">
          <GitCompareArrows size={18} />
          <span className="compare-drawer__count">
            {compareList.length}/3 selected
          </span>
        </div>

        <div className="compare-drawer__items">
          {compareVendors.map(vendor => {
            const cat = categories.find(c => c.id === vendor.category);
            return (
              <div key={vendor.id} className="compare-drawer__chip">
                <span className="compare-drawer__chip-name">{vendor.name}</span>
                <button
                  className="compare-drawer__chip-remove"
                  onClick={() => dispatch({ type: 'REMOVE_FROM_COMPARE', payload: vendor.id })}
                  aria-label={`Remove ${vendor.name} from comparison`}
                >
                  <X size={12} />
                </button>
              </div>
            );
          })}
          {Array.from({ length: 3 - compareList.length }).map((_, i) => (
            <div key={`empty-${i}`} className="compare-drawer__chip compare-drawer__chip--empty">
              <span>+ Add vendor</span>
            </div>
          ))}
        </div>

        <div className="compare-drawer__actions">
          <button
            className="btn btn-accent btn-sm"
            onClick={onCompare}
            disabled={compareList.length < 2}
          >
            Compare
            <ArrowRight size={14} />
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => dispatch({ type: 'CLEAR_COMPARE' })}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
