import { OptionsData } from "express-graphql";

import DBClient from "./modules/db-client";
import ExpressServer from "./modules/express-server";

import createSchema from "./modules/schema";
import appFactory from "./modules/app";

import { port } from "./config";

run();

async function run() {
  const dbClient = new DBClient();
  const schema = createSchema(dbClient);

  const graphqlOptions: OptionsData = {
    schema,
    graphiql: true,
  };

  const app = appFactory(graphqlOptions);
  const server = new ExpressServer(app, { port });
  await Promise.all([dbClient.connect(), server.start()]);

  console.log("Application is ready");
}
