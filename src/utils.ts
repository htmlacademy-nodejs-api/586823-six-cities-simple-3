import { OfferType } from './types/offer.js';
import crypto from 'crypto';
import { ClassConstructor, plainToInstance } from 'class-transformer';

const trueOrFalse = (str: string) => str !== 'false';

export const createOffer = (rawData: string): OfferType => {
  const tokens = rawData.replace('\n', '').split('\t');
  const [
    title,
    description,
    createdDate,
    city,
    preview,
    photosData,
    isPremium,
    rating,
    type,
    roomCount,
    guestCount,
    price,
    benefitsData,
    name,
    email,
    avatar,
    password,
    isPro,
    latitude,
    longitude,
  ] = tokens;
  const isProCorrect = Boolean(isPro);
  const latitudeCorrect = Number(latitude);
  const longitudeCorrect = Number(longitude);

  return {
    title,
    description,
    date: new Date(createdDate),
    city,
    preview,
    photos: photosData.split('; '),
    isPremium: trueOrFalse(isPremium),
    rating: Number.parseInt(rating, 10),
    type,
    roomCount: Number.parseInt(roomCount, 10),
    guestCount: Number.parseInt(guestCount, 10),
    price: Number.parseInt(price, 10),
    benefits: benefitsData.split('; '),
    user: { name, email, avatar, password, isPro: isProCorrect },
    commentsCount: 0,
    coordinates: { latitude: latitudeCorrect, longitude: longitudeCorrect },
  } as OfferType;
};

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

export const createErrorObject = (message: string) => ({
  error: message,
});

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
