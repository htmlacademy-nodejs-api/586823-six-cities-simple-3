/* eslint-disable node/no-unsupported-features/es-syntax */
import { UserType } from './user.js';

export type commentType = {
  commentText: string;
  date: string;
  rating: number;
  author: UserType;
}
