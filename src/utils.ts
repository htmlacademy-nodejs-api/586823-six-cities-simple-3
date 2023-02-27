import { OfferType } from './types/offer.js';
import crypto from 'crypto';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Benefits, CitiesNames, RoomType } from './const.js';

const trueOrFalse = (str: string) => str !== 'false';

export const createOffer = (rawData: string) => {
  const tokens = rawData.replace('\n', '').split('\t');
  const [
    title,
    description,
    createdDate,
    city,
    preview,
    photosData,
    isPremium,
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
    city: CitiesNames[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
    preview,
    photos: photosData.split('; '),
    isPremium: trueOrFalse(isPremium),
    type: RoomType[type as 'Apartment' | 'House' | 'Room' | 'Hotels'],
    roomCount: Number.parseInt(roomCount, 10),
    guestCount: Number.parseInt(guestCount, 10),
    price: Number.parseInt(price, 10),
    benefits: benefitsData.split('; ') as Benefits[],
    user: { name, email, avatar, password, isPro: isProCorrect },
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
