import { CoordinatesType } from '../../../types/offer.js';
import { UserType } from '../../../types/user.js';

export default class CreatOfferDto {
  public title!: string;
  public description!: string;
  public city!: string;
  public type!: string;
  public preview!: string;
  public photos!: string[];
  public benefits!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public roomCount!: number;
  public guestCount!: number;
  public date!: Date;
  public price!: number;
  public commentsCount!: number;
  public user!: UserType;
  public coordinates!: CoordinatesType;
}
