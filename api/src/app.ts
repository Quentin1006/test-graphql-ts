import express, { Application } from "express";
import winston, { Logger } from "winston";

// Configs
import { loggerConfig } from "./config";

import indexRouter from "./routes";

// typings
import { IDBClient } from "./entities";
import { AppContext } from "./typings";

export default (dbClient: IDBClient): Application => {
  const app: Application = express();
  const logger: Logger = winston.createLogger({
    transports: [new winston.transports.Console(loggerConfig.console)],
    exitOnError: false, // do not exit on handled exceptions
  });

  const appCtx: AppContext<IDBClient, Logger> = {
    dbClient,
    logger,
  };
  app.use("/", indexRouter(appCtx));

  return app;
};
