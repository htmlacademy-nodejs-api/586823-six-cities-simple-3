import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils.js';
import CreatOfferDto from './dto/create-offer.dto.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import OfferResponse from './responce/offer.responce.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.create});
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreatOfferDto>,
    res: Response,
  ): Promise<void> {
    const existsOffer = await this.offerService.findById(body.description);

    if (existsOffer) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.id}» exists.`,
        'UserController'
      );
    }

    const result = await this.offerService.create(body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(OfferResponse, result)
    );
  }
}
