import ExpressServer from "./express-server";
import { Adapter, DBClient, IDBClient } from "./entities";
import app from "./app";

import run from "./run";
import { PORT } from "./config/app.config";

const dbClient: IDBClient = new DBClient();
const server = new ExpressServer(app(dbClient), { port: PORT });

const dBClientAdapter = new Adapter<IDBClient>(dbClient);
const serverAdapter = new Adapter<ExpressServer>(server);

run(dBClientAdapter, serverAdapter);
