import { run } from "./run";

import { JobAPIFetcher } from "./modules/datasources";

import { Adapter, DBClient } from "./entities";

import { jobApiBaseUrl } from "./config";

import { IDBClient, IAPIFetchersMap } from "./typings";

const dbClient: IDBClient = new DBClient();
const apiFetchers: IAPIFetchersMap = {
  jobAPIFetcher: new JobAPIFetcher(jobApiBaseUrl),
};

const DBClientAdapter = new Adapter<IDBClient>(dbClient);
const apiFetcherAdapter = new Adapter<IAPIFetchersMap>(apiFetchers);

try {
  run(DBClientAdapter, apiFetcherAdapter);
} catch (error) {
  console.log(error);
}
