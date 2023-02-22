import {Min, Max, IsMongoId, IsString, Length} from 'class-validator';

export default class CreateCommentDto {
  public date!: string;

  @Min(0)
  @Max(5)
  public rating!: number;

  @IsString({message: 'text is required'})
   @Length(5, 1024, {message: 'Min length is 5, max is 1024'})
  public commentText!: string;

   @IsMongoId({message: 'offerId field must be a valid id'})
  public offerId!: string;

   @IsMongoId({message: 'userId field must be a valid id'})
   public userId!: string;
}
