import winston, { Logger } from "winston";
import { ILogger, LogLevel } from "../../typings";

type LoggerConfig = {
  level: LogLevel;
  handleExceptions: boolean;
  json: boolean;
  colorize: boolean;
};

class AppLogger implements ILogger {
  protected logger: Logger;

  constructor(config: LoggerConfig) {
    this.logger = winston.createLogger({
      transports: [new winston.transports.Console(config)],
    });
  }

  log(level: LogLevel, msg: string): void {
    this.logger.log(level, msg);
  }

  debug(msg: string): void {
    this.logger.debug(msg);
  }

  warning(msg: string): void {
    this.logger.warning(msg);
  }

  info(msg: string): void {
    this.logger.info(msg);
  }

  error(msg: string): void {
    this.logger.error(msg);
  }
}

export default AppLogger;
