
import { UserType } from './user.js';

export type CoordinatesType = {
  latitude: number;
  longitude: number;
}

export type OfferType = {
  title: string;
  description: string;
  date: Date;
  city: string;
  preview: string;
  photos: string[];
  isPremium: boolean;
  rating: number;
  type: string;
  roomCount: number;
  guestCount: number;
  price: number;
  benefits: string[];
  user: UserType;
  commentsCount: number;
  coordinates: CoordinatesType;
}
