import {DocumentType} from '@typegoose/typegoose';
import CreateCommentDto from './dto/create-comment.dto.js';
import {CommentEntity} from '../../model/comment/comment.entity.js';

export interface CommentServiceInterface {
  createToId(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | null>;
 }
