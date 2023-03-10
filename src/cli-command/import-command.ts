
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import { createOffer } from '../utils.js';
import DatabaseService from '../common/database-client/database-service.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import {getURI} from '../utils.js';
import {OfferServiceInterface} from '../modules/offer/offer-service.interface.js';
import OfferService from '../modules/offer/offer.service.js';
import {OfferModel} from '../model/offer/offer.entity.js';
import {OfferType} from '../types/offer.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import UserService from '../modules/user/user.service.js';
import { UserModel } from '../model/user/user.entity.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import ConfigService from '../common/config/config-service.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;
  private configService!: ConfigService;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
    this.configService = new ConfigService(this.logger);
  }

  private async saveOffer(offer: OfferType) {
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      ...offer,
      userId: user.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {

    if (!Number.isFinite(line)) {
      const offer = createOffer(line);
      console.log(offer);

      await this.saveOffer(offer);
      resolve();
    }
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string): Promise<void> {
    const uri = getURI(this.configService.get('DB_USER'), this.configService.get('DB_PASSWORD'), this.configService.get('DB_HOST'), DEFAULT_DB_PORT, this.configService.get('DB_NAME'));
    this.salt = this.configService.get('SALT');

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${err}`);
    }
  }
}
