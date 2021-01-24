import { run } from "./run";

import { JobAPIFetcher } from "./modules/datasources";

import { Adapter, DBClient } from "./entities";

import { JOB_API_BASEURL } from "./config";

import { IDBClient, IAPIFetchersMap } from "./typings";

const dbClient: IDBClient = new DBClient();
const apiFetchers: IAPIFetchersMap = {
  jobAPIFetcher: new JobAPIFetcher(JOB_API_BASEURL),
};

const DBClientAdapter = new Adapter<IDBClient>(dbClient);
const apiFetcherAdapter = new Adapter<IAPIFetchersMap>(apiFetchers);

try {
  run(DBClientAdapter, apiFetcherAdapter);
} catch (error) {
  console.log(error);
}
