import { OptionsData } from "express-graphql";

import DB from "./modules/db";
import ExpressServer from "./modules/express-server";

import createSchema from "./modules/schema";
import appFactory from "./modules/app";

import { port } from "./config";

run();

async function run() {
  const db = new DB();

  const graphqlOptions: OptionsData = {
    schema: createSchema(db),
    graphiql: true,
  };

  const app = appFactory(graphqlOptions);
  const server = new ExpressServer(app, { port });
  await Promise.all([db.start(), server.start()]);

  console.log("Application is ready");
}
