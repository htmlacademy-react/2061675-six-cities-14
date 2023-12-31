import { City } from './city.ts';
import { Location } from './location.ts';

export type OfferType = {
  city: City;
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  price: number;
  description: string;
  location: Location;
  id: string;
};

