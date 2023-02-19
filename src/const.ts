/* eslint-disable node/no-unsupported-features/es-syntax */
export const DEFAULT_AVATAR = 'https://abrakadabra.fun/uploads/posts/2021-12/1639410253_7-abrakadabra-fun-p-chelovechki-na-avu-7.png';

export const CitiesNames = {
  PARIS: 'PARIS',
  COLOGNE: 'COLOGNE',
  BRUSSELS: 'BRUSSELS',
  AMSTERDAM: 'AMSTERDAM',
  HAMBURG: 'HAMBURG',
  DUSSELDORF: 'DUSSELDORF',
};

export type City = {
  name: string;
  latitude: number;
  longitude: number;
}

export const offerType = {
  Apartment: 'apartment',
  House: 'house',
  Room: 'room',
  Hotels: 'hotel',
};

export const benefits = {
  BREAKFAST: 'Breakfast',
  CONDITIONING: 'Air conditioning',
  WORKHOUSE: 'Laptop friendly workspace',
  BABY_SEATS: 'Baby seat',
  WASHER: 'Washer',
  TOWELS: 'Towels',
  FRIDGE: 'Fridge',
};

export const Cities: City[] = [
  {
    name: CitiesNames.PARIS,
    latitude: 48.85661,
    longitude: 2.351499,
  },
  {
    name: CitiesNames.COLOGNE,
    latitude: 48.85661,
    longitude: 2.351499,
  },
  {
    name: CitiesNames.BRUSSELS,
    latitude: 50.846557,
    longitude: 4.351697,
  },
  {
    name: CitiesNames.AMSTERDAM,
    latitude: 52.370216,
    longitude: 4.895168,
  },
  {
    name: CitiesNames.HAMBURG,
    latitude: 53.550341,
    longitude: 10.000654,
  },
  {
    name: CitiesNames.DUSSELDORF,
    latitude: 51.225402,
    longitude: 6.776314,
  }
];

export const DEFAULT_OFFERS_COUNT = 60;
