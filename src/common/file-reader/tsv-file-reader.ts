/* eslint-disable node/no-unsupported-features/es-syntax */
import { readFileSync } from 'fs';
import { CitiesNames, offerType } from '../../const.js';
import { OfferType } from '../../types/offer.js';
import { FileReaderInterface } from './file-reader.interface.js';

const findType = (typeFromServer: string, obj: object) => {
  let typeResult = '';
  for (const type in obj) {
    if (typeFromServer.toLocaleLowerCase() === type.toLocaleLowerCase()) {
      typeResult = type;
    }
  }
  return typeResult;
};

const trueOrFalse = (str: string) => str !== 'false';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): OfferType[] | [] {
    if (!this.rawData) {
      return [];
    }

    console.log();

    return this.rawData.replaceAll('-', '').split('\n').filter((row) => row.trim() !== '').map((line) => line.split('\t')).map(
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
        return {
          title,
          description,
          date: new Date(createdDate),
          city: findType(city, CitiesNames),
          preview,
          photos: photos.split('; '),
          isPremium: trueOrFalse(isPremium),
          rating: Number.parseInt(rating, 10),
          type: findType(type, offerType),
          roomCount: Number.parseInt(roomCount, 10),
          guestCount: Number.parseInt(guestCount, 10),
          price: Number.parseInt(price, 10),
          benefits: benefits.split('; '),
          user: { name, email, avatar, password, isPro: isProCorrect },
          commentsCount: 0,
          coordinates: { latitude: latitudeCorrect, longitude: longitudeCorrect },
        };
      });
  }
}
