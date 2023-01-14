/* eslint-disable node/no-unsupported-features/es-syntax */
import { readFileSync } from 'fs';
import { CitiesNames, offerType } from '../../const.js';
import { OfferType } from '../../types/offer.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): OfferType | [] {
    if (!this.rawData) {
      return [];
    }

    console.log(this.rawData.replaceAll('-', '')
      .replaceAll('|', '')
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t')).map(
        ([
          name,
          description,
          createdDate,
          preview,
          photos,
          isPremium,
          rating,
          roomCount,
          guestCount,
          price,
          benefits,
          firstname,
          lastname,
          email,
          avatarPath,
          latitude,
          longitude
        ]) => ({
          name,
          description,
          date: new Date(createdDate),
          city: CitiesNames.AMSTERDAM, // TODO
          preview,
          photos: photos.split(';')
            .map((item) => ({item})),
          isPremium,
          rating: Number.parseInt(rating, 10),
          type: offerType.APARTAMENT, // TODO
          roomCount: Number.parseInt(roomCount, 10),
          guestCount: Number.parseInt(guestCount, 10),
          price: Number.parseInt(price, 10),
          benefits: benefits.split(';')
            .map((item) => ({item})),
          user: { email, firstname, lastname, avatarPath },
          commentsCount: 0,
          coordinates: {latitude, longitude},
        })
      ));


    return [];
  }
}
