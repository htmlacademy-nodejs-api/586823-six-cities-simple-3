import {IsEmail, IsBoolean, IsString, Length} from 'class-validator';

export default class CreateUserDto {

  @IsBoolean({message: 'isPro must be an boolean'})
  public isPro!: boolean;

   @IsEmail({}, {message: 'email must be valid address'})
  public email!: string ;

   @IsString({message: 'avatar is required'})
   public avatar!: string;

   @IsString({message: 'name is required'})
   @Length(1, 15, {message: 'Min name is 1, max is 15'})
   public name!: string;

   @IsString({message: 'password is required'})
   @Length(6, 12, {message: 'Min length for password is 6, max is 12'})
   public password!: string;
}
