/* eslint-disable node/no-unsupported-features/es-syntax */
import { CliCommandInterface } from './cli-command.interface.js';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
    ${chalk.white.bold.bgBlack('Программа для подготовки данных для REST API сервера.')}

    ${chalk.bgGreen.white('Пример: cli.js --<command> [--arguments]')}

    ${chalk.white.bold('Команды:')}

    ${chalk.white.bold('--version: ')}                  ${chalk.white('# выводит номер версии')}
    ${chalk.white.bold('--help:  ')}                    ${chalk.white('# печатает этот текст')}
    ${chalk.white.bold('--import :')} ${chalk.white.bold.blue('<path>')}${chalk.white.bold(':')}            ${chalk.white('# импортирует данные из TSV')}
    ${chalk.white.bold('--generate')} ${chalk.yellow.bold('<n>')} ${chalk.white.bold.blue('<path>')} ${chalk.blue.bold.underline('<url>')}  ${chalk.white('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
