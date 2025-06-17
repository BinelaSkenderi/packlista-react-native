import { nanoid } from 'nanoid';
import { PackItem, PackList } from '../types';

// Skapar pack items från en lista av namn, varje med ett unikt ID
const toPackItems = (names: string[]): PackItem[] =>
  names.map((name) => ({
    id: nanoid(), 
    name,
    packed: false,
  }));


export const templates: PackList[] = [
  {
    id: nanoid(),
    title: 'Weekend Getaway',
    createdAt: new Date().toISOString(),
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
    id: nanoid(),
    title: 'Business Trip',
    createdAt: new Date().toISOString(),
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
    id: nanoid(),
    title: 'Trip to Italy 2025',
    createdAt: new Date().toISOString(),
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


