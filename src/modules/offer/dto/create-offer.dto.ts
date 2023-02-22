import { CoordinatesType } from '../../../types/offer.js';
import {IsArray, IsObject, IsBoolean, IsDateString, IsInt, IsMongoId, Max, MaxLength, Min, MinLength} from 'class-validator';

export default class CreatOfferDto {
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1000, {message: 'Maximum description length must be 1000'})
  public description!: string;

  public city!: string;
  public type!: string;
  public preview!: string;

  @IsArray({message: 'benefits must be an array'})
  public photos!: string[];

  @IsArray({message: 'benefits must be an array'})
  public benefits!: string[];

  @IsBoolean({message: 'isPremium must be an boolean'})
  public isPremium!: boolean;

  @Min(0)
  @Max(5)
  public rating!: number;

  @IsInt({message: 'Room count must be an integer'})
  public roomCount!: number;

  @IsInt({ message: 'Guest count must be an integer' })
  public guestCount!: number;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public date!: Date;

  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(200000, {message: 'Maximum price is 200000'})
  public price!: number;

  @IsInt({message: 'Comments must be an integer'})
  public commentsCount!: number;

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId!: string;

  @IsObject({message: 'coordinates must be valid an object'})
  public coordinates!: CoordinatesType;
}
