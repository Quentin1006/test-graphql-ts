import { IAdapter } from "./entities";

const run = async (
  dbClientAdapter: IAdapter,
  serverAdapter: IAdapter,
): Promise<void> => {
  const dbClient = dbClientAdapter.exposed;
  const server = serverAdapter.exposed;

  await Promise.all([dbClient.connect(), server.start()]);
  // @TODO: Handle error case
  console.log("API is ready");
};

export default run;
