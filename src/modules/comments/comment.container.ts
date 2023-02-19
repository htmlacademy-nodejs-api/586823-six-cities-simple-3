import {Container} from 'inversify';
import {CommentServiceInterface} from './comment-service.interface.js';
import CommentService from './comment.service.js';
import {Component} from '../../types/component.types.js';
import { CommentEntity, CommentModel } from '../../model/comment/comment.entity.js';
import { types } from '@typegoose/typegoose';

const commentContainer = new Container();

commentContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService);
commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

export {commentContainer};
