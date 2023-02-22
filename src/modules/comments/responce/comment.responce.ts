import {Expose, Type} from 'class-transformer';
import { UserType } from '../../../types/user.js';
import UserResponse from '../../user/responce/user.responce.js';

export default class CommentResponse {
  @Expose()
  public commentText!: string;

  @Expose()
  public date!: Date;

  @Expose()
  public rating!: number;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public author!: UserType;
}
