import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/responce/user.responce.js';

export default class CommentResponse {
  @Expose()
  public id!: string;

  @Expose()
  public commentText!: string;

  @Expose()
  public date!: Date;

  @Expose()
  public rating!: number;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public author!: UserResponse;
}
