import express, { Application } from "express";
import winston, { Logger } from "winston";

// Configs
import { loggerConfig } from "./config";

import indexRouter from "./routes";

// typings
import { AppContext, IDBClient } from "./typings";

export default (dbClient: IDBClient): Application => {
  const app: Application = express();
  const logger: Logger = winston.createLogger({
    transports: [
      new winston.transports.File(loggerConfig.fileInfo),
      new winston.transports.File(loggerConfig.fileError),
    ],
    exitOnError: false, // do not exit on handled exceptions
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console(loggerConfig.console));
  }

  const appCtx: AppContext<Logger> = {
    dbClient,
    logger,
  };
  app.use("/", indexRouter(appCtx));

  return app;
};
