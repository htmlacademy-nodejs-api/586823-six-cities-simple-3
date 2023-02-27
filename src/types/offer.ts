
import { Benefits, CitiesNames, RoomType } from '../const.js';
import { UserType } from './user.js';

export type CoordinatesType = {
  latitude: number;
  longitude: number;
}

export type OfferType = {
  title: string;
  description: string;
  date: Date;
  city: CitiesNames;
  preview: string;
  photos: string[];
  isPremium: boolean;
  type: RoomType;
  roomCount: number;
  guestCount: number;
  price: number;
  benefits: Benefits[];
  user: UserType;
  coordinates: CoordinatesType;
}
