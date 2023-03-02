import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { Benefits, CitiesNames } from '../../const.js';
import { CoordinatesType} from '../../types/offer.js';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

 @modelOptions({
   schemaOptions: {
     collection: 'offers'
   }
 })
// TODO Вывод
export class OfferEntity extends defaultClasses.TimeStamps {
   @prop({trim: true, required: true})
  public title!: string;

   @prop({trim: true})
   public description!: string;

  @prop({
    type: () => String,
    enum: CitiesNames
  })
   public city!: CitiesNames;

  @prop({ required: true})
  public type!: string;

   @prop({ required: true})
  public preview!: string;

   @prop()
   public photos!: string[];

   @prop({
     type: () => String,
     enum: Benefits
   })
   public benefits!: Benefits[];

   @prop()
   public isPremium!: boolean;

   @prop()
   public rating!: number;

   @prop()
   public roomCount!: number;

   @prop()
   public guestCount!: number;

   @prop()
   public date!: Date;

   @prop()
   public price!: number;

   @prop({default: 0})
   public commentsCount!: number;

   @prop({
     ref: UserEntity,
     required: true
   })
   public userId!: Ref<UserEntity>;

   @prop()
   public coordinates!: CoordinatesType;
}

export const OfferModel = getModelForClass(OfferEntity);
