import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offer.entity.js';
import { UserEntity } from '../user/user.entity.js';


const {prop, modelOptions} = typegoose;
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ unique: true })
  public commentText!: string;

  @prop({required: true})
  public date!: Date;

  @prop({ unique: true })
  public rating!: number;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId!: Ref<OfferEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

}

export const CommentModel = getModelForClass(CommentEntity);
