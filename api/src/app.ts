import express, { Application } from "express";
import winston, { Logger } from "winston";

// Configs
import { loggerConfig } from "./config";

import indexRouter from "./routes";

// typings
import { IAppContext, ILogger, IDBClient } from "./typings";

export default (dbClient: IDBClient): Application => {
  const app: Application = express();
  const logger: Logger = winston.createLogger({
    transports: [new winston.transports.Console(loggerConfig.console)],
    exitOnError: false, // do not exit on handled exceptions
  });

  const appCtx: IAppContext<IDBClient, ILogger> = {
    dbClient,
    logger,
  };
  app.use("/", indexRouter(appCtx));

  return app;
};
