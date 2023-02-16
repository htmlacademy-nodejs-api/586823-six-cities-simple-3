import {Container} from 'inversify';
import {UserServiceInterface} from './user-service.interface.js';
import UserService from './user.service.js';
import {Component} from '../../types/component.types.js';
import { UserEntity, UserModel } from '../../model/user/user.entity.js';
import { types } from '@typegoose/typegoose';

const userContainer = new Container();

userContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

export {userContainer};
