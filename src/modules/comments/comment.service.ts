import {CommentEntity} from '../../model/comment/comment.entity.js';
import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import {CommentServiceInterface} from './comment-service.interface.js';

import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {Component} from '../../types/component.types.js';
import { inject, injectable } from 'inversify';
import { types } from '@typegoose/typegoose';

 @injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async createToId(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    this.logger.info(`New comment created by: ${dto.author}`);

    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | null> {
    return this.commentModel
      .find({offerId})
      .populate('userId');
  }
}
