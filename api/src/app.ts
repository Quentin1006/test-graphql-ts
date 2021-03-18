import express, { Application } from "express";

import { Logger } from "./entities";

// Configs
import { loggerConfig } from "./config";

import indexRouter from "./routes";

// typings
import { IAppContext, ILogger, IDBClient } from "./typings";

export default (dbClient: IDBClient): Application => {
  const app: Application = express();
  const logger: Logger = new Logger(loggerConfig);

  const appCtx: IAppContext<IDBClient, ILogger> = {
    dbClient,
    logger,
  };
  app.use("/", indexRouter(appCtx));

  return app;
};
