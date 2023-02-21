import {Expose} from 'class-transformer';
import { CoordinatesType } from '../../../types/offer.js';
import { UserType } from '../../../types/user.js';

export default class OfferResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public date!: Date;

  @Expose()
  public city!: string;

  @Expose()
  public preview!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public roomCount!: number;

  @Expose()
  public guestCount!: number;

  @Expose()
  public price!: number;

  @Expose()
  public benefits!: string[];

  @Expose()
  public user!: UserType;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public coordinates!: CoordinatesType;

}
