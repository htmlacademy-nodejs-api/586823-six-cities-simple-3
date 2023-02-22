import {Expose, Type} from 'class-transformer';
import { CoordinatesType } from '../../../types/offer.js';
import UserResponse from '../../user/responce/user.responce.js';

export default class OfferResponse {
  @Expose()
  public _id!: string;

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

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public coordinates!: CoordinatesType;

}
