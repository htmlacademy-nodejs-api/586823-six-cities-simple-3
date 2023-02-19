export default class UpdateOfferDto {
  public title!: string;
  public description!: string;
  public preview!: string;
  public photos!: string[];
  public benefits!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public roomCount!: number;
  public guestCount!: number;
  public date!: Date;
  public price!: number;
  public commentsCount!: number;
}
