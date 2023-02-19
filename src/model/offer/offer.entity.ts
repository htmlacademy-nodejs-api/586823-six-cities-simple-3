import typegoose, {defaultClasses, getModelForClass} from '@typegoose/typegoose';
import { CoordinatesType, OfferType } from '../../types/offer.js';
import { UserType } from '../../types/user.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

 @modelOptions({
   schemaOptions: {
     collection: 'offers'
   }
 })
export class OfferEntity extends defaultClasses.TimeStamps implements OfferType {
  constructor(data: OfferType) {
    super();

    this.title = data.title;
    this.description = data.description;
    this.city = data.city;
    this.type = data.type;
    this.preview = data.preview;
    this.photos = data.photos;
    this.benefits = data.benefits;
    this.isPremium = data.isPremium;
    this.rating = data.rating;
    this.roomCount = data.roomCount;
    this.guestCount = data.guestCount;
    this.date = data.date;
    this.price = data.price;
    this.user = data.user;
    this.coordinates = data.coordinates;
  }

   @prop({trim: true, required: true})
  public title!: string;

   @prop({trim: true})
   public description!: string;

  @prop()
   public city!: string;

  @prop({ required: true})
  public type!: string;

   @prop({ required: true})
  public preview!: string;

   @prop()
   public photos!: string[];

   @prop()
   public benefits!: string[];

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
     required: true
   })
   public user!: UserType;

   @prop()
   public coordinates!: CoordinatesType;
}

export const OfferModel = getModelForClass(OfferEntity);
