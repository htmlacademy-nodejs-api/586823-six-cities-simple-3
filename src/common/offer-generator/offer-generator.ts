import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { UserType } from '../../types/user.js';

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    const date = getRandomItem<string>(this.mockData.date);
    const city = 'Paris';
    const preview = 'https://media.tacdn.com/media/attractionssplicespp360x240/07/84/50/bd.jpg';
    const photos = [
      'https://media.architecturaldigest.com/photos/60f0ac7f42f0c9a97635395d/16:9/w_2560%2Cc_limit/DG19_4301.jpg',
      'https://www.thenordroom.com/wpcontent/uploads/2021/12/parisapartmentjackiekaiellisnordroom1200x1500.jpg',
      'https://www.mychicobsession.com/wpcontent/uploads/2019/10/parisianapartmentdecoration.jpg',
      'https://hips.hearstapps.com/hmgprod/images/vergutfra0031608601518.jpg',
      'https://hips.hearstapps.com/hmgprod/images/vergutfra0031608601518.jpg',
      'https://media.architecturaldigest.com/photos/60f0ac7f42f0c9a97635395d/16:9/w_2560%2Cc_limit/DG19_4301.jpg'
    ].join('; ');
    const isPremium = getRandomItem<boolean>([true, false]);
    const rating = generateRandomValue(1, 5);
    const type = 'Apartament';
    const roomCount = generateRandomValue(1, 5);
    const guestCount = roomCount + 3;
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const benefits = getRandomItems(this.mockData.benefits).join('; ');
    const user = getRandomItem<UserType>(this.mockData.user);
    const commentsCount = generateRandomValue(1, 10);
    const coordinates = {
      latitude: 48.85661,
      longitude: 2.351499
    };
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    const name = user.name;
    const email = user.email;
    const avatar = user.avatar;
    const isPro = user.isPro;

    return [
      title, description, date, city, preview, photos, isPremium, rating, type, roomCount, guestCount, price, benefits, name, email, avatar, isPro, commentsCount, latitude, longitude
    ].join('\t');
  }
}
