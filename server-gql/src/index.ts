import { ApolloServerExpressConfig } from "apollo-server-express";

import DBClient from "./modules/db-client";
import ExpressServer from "./modules/express-server";

import { createTypeDefsAndResolvers } from "./modules/schema";
import appFactory from "./modules/app";

import { port, jobApiBaseUrl } from "./config";
import { JobAPIFetcher } from "./modules/datasources";

run();

async function run() {
  const dbClient = new DBClient();
  const { typeDefs, resolvers } = createTypeDefsAndResolvers(dbClient);

  const graphqlOptions: ApolloServerExpressConfig = {
    typeDefs,
    resolvers,
    dataSources: () => ({
      jobAPIFetcher: new JobAPIFetcher(jobApiBaseUrl),
    }),
    context: {},
    playground: true,
  };

  const app = appFactory();
  const server = new ExpressServer(app, { port, graphqlOptions });
  await Promise.all([dbClient.connect(), server.start()]);

  console.log("Application is ready");
}
