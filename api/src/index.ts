import ExpressServer from "./express-server";
import { Adapter, DBClient, IDBClient } from "./entities";
import app from "./app";

import run from "./run";
import { PORT } from "./config/app.config";

let i = 1;
setInterval(() => {
  console.log("Init API, log number:", i++);
}, 2000);

const dbClient: IDBClient = new DBClient();
const server = new ExpressServer(app(dbClient), { port: PORT });

const dBClientAdapter = new Adapter<IDBClient>(dbClient);
const serverAdapter = new Adapter<ExpressServer>(server);

run(dBClientAdapter, serverAdapter);
