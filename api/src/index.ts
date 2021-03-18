import { Adapter, DBClient, HttpServer } from "./entities";
import app from "./app";

import run from "./run";
import { PORT } from "./config/app.config";

import { IDBClient, IServer } from "./typings";

const dbClient: IDBClient = new DBClient();
const server = new HttpServer(app(dbClient), { port: PORT });

const dBClientAdapter = new Adapter<IDBClient>(dbClient);
const serverAdapter = new Adapter<IServer>(server);

run(dBClientAdapter, serverAdapter);
