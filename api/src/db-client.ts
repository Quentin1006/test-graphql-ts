import { Pool, QueryResult } from "pg";

import { IDBClient } from "./typings";

class DBClient implements IDBClient {
  protected pool: Pool;

  constructor() {
    this.pool = new Pool();
  }

  async connect(): Promise<Pool | Error> {
    let retries = 5;
    let retError: Error | null = null;
    while (retries > 0) {
      try {
        await this.pool.connect();
        return this.pool;
      } catch (error) {
        console.warn(error);
        retries -= 1;
        retError = error;
        await new Promise((res) => setTimeout(res, 5000));
      }
    }
    return new Error(`Could not connect to the db,  ${retError}`);
  }

  query(text: string, params?: (string | number)[]): Promise<QueryResult> {
    return this.pool.query(text, params);
  }

  async stop(): Promise<void> {
    await this.pool.end();
  }
}

export default DBClient;
