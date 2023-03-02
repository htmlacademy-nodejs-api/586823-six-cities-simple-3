/* eslint-disable node/no-unsupported-features/es-syntax */
export const DEFAULT_AVATAR = 'https://abrakadabra.fun/uploads/posts/2021-12/1639410253_7-abrakadabra-fun-p-chelovechki-na-avu-7.png';

export enum CitiesNames {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum Benefits {
  Breakfast = 'Breakfast',
  Air_conditioning = 'Air conditioning',
  Laptop_friendly_workspace = 'Laptop friendly workspace',
  Baby_seats = 'Baby seats',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge',
}

export type City = {
  name: CitiesNames;
  latitude: number;
  longitude: number;
}

export enum RoomType {
  Apartment = 'Apartment',
  House = 'House',
  Room = 'Room',
  Hotels = 'Hotel',
}

export const DEFAULT_OFFERS_COUNT = 60;
