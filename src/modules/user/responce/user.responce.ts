import {Expose} from 'class-transformer';

export default class UserResponse {
  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public _id!: string;

  @Expose()
  public isPro!: boolean;
}
