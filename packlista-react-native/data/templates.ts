import { v4 as uuidv4 } from 'uuid';
import { PackItem, PackList } from '../types';

const toPackItems = (names: string[]): PackItem[] =>
  names.map((name) => ({
    id: uuidv4(),
    name,
    packed: false,
  }));

const templates: PackList[] = [
  {
    id: 'weekend-getaway',
    title: 'Weekend Getaway',
    items: toPackItems([
      'Clothes (2–3 outfits)',
      'Toiletries',
      'Phone charger',
      'Snacks',
      'Book or Kindle',
      'Sunglasses',
      'Light jacket',
      'Meds / Essentials',
    ]),
  },
  {
    id: 'business-trip',
    title: 'Business Trip',
    items: toPackItems([
      'Work clothes / Business attire',
      'Laptop + charger',
      'Travel documents',
      'Notebook + pens',
      'Business cards',
      'Headphones',
      'Power bank',
      'Toothbrush & shaving kit',
    ]),
  },
  {
    id: 'italy-2025',
    title: 'Trip to Italy 2025',
    items: toPackItems([
      'Passport',
      'Visa (if required)',
      'Euros / Travel card',
      'Italy guidebook or app',
      'Outfits for different weather',
      'Adapter for EU plugs',
      'Comfortable walking shoes',
      'Camera / Phone with storage',
      'Language translator or cheat sheet',
      'Sunscreen / Hat / Sunglasses',
      'Travel insurance documents',
      'Copy of itinerary & bookings',
    ]),
  },
];
export default templates;  