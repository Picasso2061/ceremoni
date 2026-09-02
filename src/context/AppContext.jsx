import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext(null);

const initialState = {
  // Simulated auth
  user: {
    id: 'u001',
    name: 'Chioma Adebayo',
    email: 'chioma@example.com',
    role: 'customer', // 'customer' | 'vendor'
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
    title: 'Chioma & David\'s Wedding',
    date: '2026-10-15',
    guestCount: 300,
    budget: 10000000,
    spent: 6700000,
  },
  // Favorites
  favorites: ['v003', 'v007', 'v013'],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };
    case 'UPDATE_BOOKING_STATUS':
      return {
        ...state,
        bookings: state.bookings.map(b =>
          b.id === action.payload.id ? { ...b, status: action.payload.status } : b
        ),
      };
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
    case 'UPDATE_EVENT':
      return {
        ...state,
        event: { ...state.event, ...action.payload },
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
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
