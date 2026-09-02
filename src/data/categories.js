import {
  Building2,
  UtensilsCrossed,
  Camera,
  Flower2,
  Music,
  Mic2,
  Shirt,
  Car,
} from 'lucide-react';

import venuesImg from '../assets/categories/venues.jpg';
import cateringImg from '../assets/categories/catering.jpg';
import photographyImg from '../assets/categories/photography.jpg';
import decorImg from '../assets/categories/decor.jpg';
import musicImg from '../assets/categories/music.jpg';
import mcImg from '../assets/categories/mc.jpg';

const categories = [
  {
    id: 'venues',
    name: 'Venues',
    icon: Building2,
    description: 'Stunning halls, gardens, and ceremony spaces for your perfect event',
    gradient: 'linear-gradient(135deg, #2D1B33 0%, #6b3a75 100%)',
    image: venuesImg,
    eventTypes: ['wedding', 'burial'],
    count: 48,
  },
  {
    id: 'catering',
    name: 'Catering',
    icon: UtensilsCrossed,
    description: 'Exquisite cuisine and beverage services to delight every guest',
    gradient: 'linear-gradient(135deg, #D4A754 0%, #e8c06a 100%)',
    image: cateringImg,
    eventTypes: ['wedding', 'burial'],
    count: 35,
  },
  {
    id: 'photography',
    name: 'Photography & Video',
    icon: Camera,
    description: 'Capture every precious moment with skilled visual storytellers',
    gradient: 'linear-gradient(135deg, #432448 0%, #8f5f98 100%)',
    image: photographyImg,
    eventTypes: ['wedding', 'burial'],
    count: 42,
  },
  {
    id: 'decor',
    name: 'Décor & Florals',
    icon: Flower2,
    description: 'Transform any space into a breathtaking, memorable environment',
    gradient: 'linear-gradient(135deg, #c2185b 0%, #e91e63 100%)',
    image: decorImg,
    eventTypes: ['wedding', 'burial'],
    count: 29,
  },
  {
    id: 'music',
    name: 'Music & DJ',
    icon: Music,
    description: 'Set the perfect mood with live bands, DJs, and sound systems',
    gradient: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
    image: musicImg,
    eventTypes: ['wedding'],
    count: 22,
  },
  {
    id: 'mc',
    name: 'MC & Officiants',
    icon: Mic2,
    description: 'Charismatic hosts and officiants to guide your ceremony beautifully',
    gradient: 'linear-gradient(135deg, #004d40 0%, #00897b 100%)',
    image: mcImg,
    eventTypes: ['wedding', 'burial'],
    count: 18,
  },
  {
    id: 'attire',
    name: 'Attire & Styling',
    icon: Shirt,
    description: 'Bridal gowns, suits, makeup, and styling for the perfect look',
    gradient: 'linear-gradient(135deg, #bf360c 0%, #f4511e 100%)',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=800&h=600&fit=crop&q=80',
    eventTypes: ['wedding'],
    count: 26,
  },
  {
    id: 'transport',
    name: 'Transportation',
    icon: Car,
    description: 'Luxury vehicles and logistics for seamless guest and party movement',
    gradient: 'linear-gradient(135deg, #263238 0%, #546e7a 100%)',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0484?w=800&h=600&fit=crop&q=80',
    eventTypes: ['wedding', 'burial'],
    count: 15,
  },
];

export default categories;
