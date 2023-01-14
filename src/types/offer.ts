/* eslint-disable node/no-unsupported-features/es-syntax */
import { benefits, CitiesNames, offerType } from '../const.js';

type CoordinatesType = {
  latitude: number;
  longitude: number;
}

export type OfferType = {
  name: string;
  description: string;
  date: Date;
  city: CitiesNames;
  preview: string;
  photos: string[];
  isPremium: boolean;
  rating: number;
  type: offerType;
  roomCount: number;
  guestCount: number;
  price: number;
  benefits: benefits[];
  user: UserType;
  commentsCount: number;
  coordinates: CoordinatesType;
}
