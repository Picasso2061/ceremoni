import { createContext, useContext, useReducer } from 'react';
import reviewsData from '../data/reviews';

const AppContext = createContext(null);

const initialChecklist = [
  { id: 'ck1', label: 'Book a venue', done: true },
  { id: 'ck2', label: 'Hire a photographer/videographer', done: true },
  { id: 'ck3', label: 'Arrange catering', done: false },
  { id: 'ck4', label: 'Select décor & florals', done: false },
  { id: 'ck5', label: 'Book music/DJ', done: false },
  { id: 'ck6', label: 'Hire MC/officiant', done: false },
  { id: 'ck7', label: 'Arrange transportation', done: false },
  { id: 'ck8', label: 'Finalize attire & styling', done: false },
];

const initialState = {
  // Simulated auth — 'customer' or 'vendor'
  user: {
    id: 'u001',
    name: 'Chioma Adebayo',
    email: 'chioma@example.com',
    role: 'customer',
    vendorId: 'v001', // which vendor profile this user owns (for vendor role)
  },

  // Customer bookings
  bookings: [
    {
      id: 'b001',
      vendorId: 'v003',
      vendorName: 'Lumière Studios',
      category: 'photography',
      eventType: 'wedding',
      eventDate: '2026-10-15',
      status: 'confirmed',
      totalPrice: '₦700,000',
      notes: 'Photo + Video Bundle for the full day',
      createdAt: '2026-08-01',
    },
    {
      id: 'b002',
      vendorId: 'v002',
      vendorName: 'Saveur Catering Co.',
      category: 'catering',
      eventType: 'wedding',
      eventDate: '2026-10-15',
      status: 'pending',
      totalPrice: '₦3,500,000',
      notes: 'Full service for 100 guests',
      createdAt: '2026-08-10',
    },
    {
      id: 'b003',
      vendorId: 'v001',
      vendorName: 'The Grand Monarch Hall',
      category: 'venues',
      eventType: 'wedding',
      eventDate: '2026-10-15',
      status: 'confirmed',
      totalPrice: '₦2,500,000',
      notes: 'Grand Ballroom booking',
      createdAt: '2026-07-20',
    },
  ],

  // Customer event
  event: {
    type: 'wedding',
    title: "Chioma & David's Wedding",
    date: '2026-10-15',
    guestCount: 300,
    budget: 10000000,
    spent: 6700000,
  },

  // Favorites
  favorites: ['v003', 'v007', 'v013'],

  // Vendor comparison list (max 3)
  compareList: [],

  // Reviews (seeded from data file, new reviews appended here)
  reviews: reviewsData,

  // Interactive planning checklist
  checklist: initialChecklist,

  // Incoming booking requests for the vendor dashboard
  incomingRequests: [
    {
      id: 'req001',
      clientName: 'Adaeze Nwosu',
      clientEmail: 'adaeze@example.com',
      clientPhone: '+234 803 456 7890',
      eventType: 'wedding',
      eventDate: '2026-11-22',
      guestCount: '200',
      selectedService: 'Grand Ballroom (500 guests)',
      specialRequests: 'We need the hall from 10am to midnight. Can you accommodate?',
      status: 'pending',
      createdAt: '2026-09-05',
    },
    {
      id: 'req002',
      clientName: 'Tunde Fashola',
      clientEmail: 'tunde.fashola@example.com',
      clientPhone: '+234 705 123 9876',
      eventType: 'burial',
      eventDate: '2026-09-30',
      guestCount: '150',
      selectedService: 'Garden Terrace (200 guests)',
      specialRequests: 'This is a quiet family ceremony. Please ensure staff are respectful.',
      status: 'pending',
      createdAt: '2026-09-06',
    },
    {
      id: 'req003',
      clientName: 'Ngozi & Emeka Obi',
      clientEmail: 'ngozi.obi@example.com',
      clientPhone: '+234 812 345 6543',
      eventType: 'wedding',
      eventDate: '2026-12-05',
      guestCount: '400',
      selectedService: 'Full Day Rental (12 hrs)',
      specialRequests: 'We will be having both church and reception here. Need separate staging areas.',
      status: 'accepted',
      createdAt: '2026-08-28',
    },
    {
      id: 'req004',
      clientName: 'Fatima Bello',
      clientEmail: 'fatima.b@example.com',
      clientPhone: '+234 901 567 2345',
      eventType: 'wedding',
      eventDate: '2026-10-10',
      guestCount: '50',
      selectedService: 'VIP Lounge (50 guests)',
      specialRequests: '',
      status: 'declined',
      createdAt: '2026-08-15',
    },
  ],

  // Vendor stats (for the vendor dashboard)
  vendorStats: {
    views: 1284,
    favorites: 47,
    bookings: 23,
    responseRate: 96,
  },
};

function appReducer(state, action) {
  switch (action.type) {
    // ── Bookings ──────────────────────────────────────────────
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] };

    case 'UPDATE_BOOKING_STATUS':
      return {
        ...state,
        bookings: state.bookings.map(b =>
          b.id === action.payload.id ? { ...b, status: action.payload.status } : b
        ),
      };

    // ── Event ─────────────────────────────────────────────────
    case 'UPDATE_EVENT':
      return { ...state, event: { ...state.event, ...action.payload } };

    // ── Favorites ─────────────────────────────────────────────
    case 'TOGGLE_FAVORITE': {
      const id = action.payload;
      const isFav = state.favorites.includes(id);
      return {
        ...state,
        favorites: isFav
          ? state.favorites.filter(f => f !== id)
          : [...state.favorites, id],
      };
    }

    // ── Compare list ──────────────────────────────────────────
    case 'ADD_TO_COMPARE': {
      if (state.compareList.includes(action.payload)) return state;
      if (state.compareList.length >= 3) return state; // max 3
      return { ...state, compareList: [...state.compareList, action.payload] };
    }
    case 'REMOVE_FROM_COMPARE':
      return {
        ...state,
        compareList: state.compareList.filter(id => id !== action.payload),
      };
    case 'CLEAR_COMPARE':
      return { ...state, compareList: [] };

    // ── Reviews ───────────────────────────────────────────────
    case 'ADD_REVIEW':
      return { ...state, reviews: [...state.reviews, action.payload] };

    // ── Checklist ─────────────────────────────────────────────
    case 'TOGGLE_CHECKLIST_ITEM':
      return {
        ...state,
        checklist: state.checklist.map(item =>
          item.id === action.payload ? { ...item, done: !item.done } : item
        ),
      };

    // ── Incoming requests (vendor dashboard) ──────────────────
    case 'UPDATE_REQUEST_STATUS':
      return {
        ...state,
        incomingRequests: state.incomingRequests.map(r =>
          r.id === action.payload.id ? { ...r, status: action.payload.status } : r
        ),
      };

    // ── Role switch ───────────────────────────────────────────
    case 'SWITCH_ROLE':
      return {
        ...state,
        user: { ...state.user, role: action.payload },
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
