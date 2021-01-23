import { ApolloServerExpressConfig } from "apollo-server-express";

import { GraphQLServer } from "./entities";

import { createTypeDefsAndResolvers } from "./modules/schema";
import createExpressApp from "./modules/app";

import { port } from "./config";

import { IAdapter } from "./typings";

export const run = async (
  dbClientAdapter: IAdapter,
  apiFetchersAdapter: IAdapter,
): Promise<void> => {
  const dbClient = dbClientAdapter.exposed;
  const apiFetchers = apiFetchersAdapter.exposed;

  const { typeDefs, resolvers } = createTypeDefsAndResolvers();

  const graphqlOptions: ApolloServerExpressConfig = {
    typeDefs,
    resolvers,
    dataSources: () => apiFetchers,
    context: {
      db: dbClient,
    },
    playground: true,
  };

  const app = createExpressApp();
  const server = new GraphQLServer(app, { port, graphqlOptions });

  await Promise.all([dbClient.connect(), server.start()]);

  console.log("Application is ready");
};
