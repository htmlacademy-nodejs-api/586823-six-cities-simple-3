import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from '../../model/offer/offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
