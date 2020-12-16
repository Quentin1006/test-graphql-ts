import ExpressServer from "./express-server";
import DBClient from "./db-client";
import app from "./app";

const server = new ExpressServer(app);
const dbClient = new DBClient();

run();

async function run(): Promise<void> {
  await Promise.all([dbClient.connect(), server.start()]);
  console.log("API is ready");
}
