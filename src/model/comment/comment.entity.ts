import {commentType} from '../../types/comment.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { UserType } from '../../types/user.js';


const {prop, modelOptions} = typegoose;
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps implements commentType {

  constructor(offerId: number, data: commentType) {
    super();

    this.offerId = offerId;
    this.commentText = data.commentText;
    this.date = data.date;
    this.rating = data.rating;
    this.author = data.author;
  }

  @prop()
  public offerId!: number;

  @prop({ unique: true })
  public commentText!: string;

  @prop({required: true})
  public date!: Date;

  @prop({ unique: true })
  public rating!: number;

  @prop({required: true})
  public author!: UserType;

}

export const CommentModel = getModelForClass(CommentEntity);
