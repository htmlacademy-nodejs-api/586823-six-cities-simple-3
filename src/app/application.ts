import { inject, injectable } from 'inversify';
import { ConfigInterface } from '../common/config/config.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { Component } from '../types/component.types.js';
import { getURI } from '../utils.js';
import express, {Express} from 'express';
import { ExceptionFilterInterface } from '../common/errors/exeption-filter.interface.js';
import { ControllerInterface } from '../common/controller/controller.interface.js';
import { AuthenticateMiddleware } from '../common/middlewares/authenticate.middleware.js';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(@inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private db: DatabaseInterface,
    @inject(Component.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,
    @inject(Component.UserController) private userController: ControllerInterface,
    @inject(Component.OfferController) private offerController: ControllerInterface,
  @inject(Component.CommentController) private commentController: ControllerInterface,) {
    this.expressApp = express();
  }

  public initMiddleware() {
    this.expressApp.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.expressApp.use(express.json());

    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
    this.expressApp.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  public initRoutes() {
    this.expressApp.use('/users', this.userController.router);
    this.expressApp.use('/offers', this.offerController.router);
    this.expressApp.use('/comments', this.commentController.router);
  }

  public initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.logger.info('Application has been initialized');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    const URI = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),);

    await this.db.connect(URI);

    this.initMiddleware();
    this.initRoutes();
    this.initExceptionFilters();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
