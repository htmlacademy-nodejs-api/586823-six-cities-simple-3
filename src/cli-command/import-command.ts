
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

const DEFAULT_DB_PORT = 27017;

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveOffer(offer: OfferType) {
    await this.offerService.create({
      ...offer
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line)[0];
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string): Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname);

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
