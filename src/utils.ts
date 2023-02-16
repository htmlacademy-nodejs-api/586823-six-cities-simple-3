import { OfferType } from './types/offer.js';
import crypto from 'crypto';

const trueOrFalse = (str: string) => str !== 'false';

export const createOffer = (rawData: string): OfferType[] => rawData.split('\n').filter((row) => row.trim() !== '').map((line) => line.split('\t')).map(
  ([
    title,
    description,
    createdDate,
    city,
    preview,
    photos,
    isPremium,
    rating,
    type,
    roomCount,
    guestCount,
    price,
    benefits,
    name,
    email,
    avatar,
    password,
    isPro,
    latitude,
    longitude,
  ]) => {
    const isProCorrect = Boolean(isPro);
    const latitudeCorrect = Number(latitude);
    const longitudeCorrect = Number(longitude);
    console.log(createdDate);

    return {
      title,
      description,
      date: new Date(createdDate),
      city,
      preview,
      photos: photos.split('; '),
      isPremium: trueOrFalse(isPremium),
      rating: Number.parseInt(rating, 10),
      type,
      roomCount: Number.parseInt(roomCount, 10),
      guestCount: Number.parseInt(guestCount, 10),
      price: Number.parseInt(price, 10),
      benefits: benefits.split('; '),
      user: { name, email, avatar, password, isPro: isProCorrect },
      commentsCount: 0,
      coordinates: { latitude: latitudeCorrect, longitude: longitudeCorrect },
    };
  });

export const getURI = (
  username: string,
  password: string,
  host: string,
  port: number,
  databaseName: string,
): string => `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
