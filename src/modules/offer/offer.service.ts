import {inject, injectable} from 'inversify';
import {OfferServiceInterface} from './offer-service.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from '../../model/offer/offer.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import updateOfferDto from './dto/update-offer.dto.js';
import { DEFAULT_OFFERS_COUNT } from '../../const.js';

 @injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
     @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
     @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async find(limit?: number): Promise<DocumentType<OfferEntity>[]> {
    const limitCount = limit ?? DEFAULT_OFFERS_COUNT;
    return this.offerModel
      .find()
      .limit(limitCount)
      .populate(['userId'])
      .exec();
  }

  public updateById(offerId: string, dto: updateOfferDto): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId', 'categories'])
      .exec();
  }

  public deleteById(offerId: string): void {
    this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }
}
