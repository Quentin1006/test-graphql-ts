import express, { Application } from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

import { Logger, Router } from "./entities";

// Configs
import { loggerConfig, corsConfig } from "./config";

import Modules from "./modules";

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

  app.use(cors(corsConfig));
  app.use(compression());
  app.use(helmet());

  // Instantiate modules
  const modules = Modules.map((Module) => {
    return Module(appCtx);
  });

  // Register routes
  const appRouter = new Router();
  modules.forEach(({ basePath, router }) => {
    appRouter.register(basePath, router);
  });

  app.use("/", appRouter.router);

  return app;
};
