
import { UserType } from './user.js';

export type commentType = {
  commentText: string;
  date: Date;
  rating: number;
  author: UserType;
}
