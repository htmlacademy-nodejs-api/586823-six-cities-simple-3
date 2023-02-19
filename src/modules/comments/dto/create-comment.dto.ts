import { UserType } from '../../../types/user.js';

export default class CreateCommentDto {
  public commentText!: string;
  public date!: Date;
  public rating!: number;
  public author!: UserType;
  public offerId!: string;
}
