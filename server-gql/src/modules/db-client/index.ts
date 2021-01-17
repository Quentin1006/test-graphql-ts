import { Pool, QueryResult } from "pg";

import {
  DBResponseInterface,
  DBInterface,
  Node,
  NodeFilterFn,
  QueryOptions,
} from "../../typings";

class DBClient implements DBInterface {
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

  async find(
    what: string,
    filter?: NodeFilterFn
  ): Promise<DBResponseInterface> {
    try {
      let { rows }: QueryResult = await this.pool.query(
        `SELECT * FROM ${what}`
      );
      if (filter) {
        rows = rows.filter(<T extends Node>(result: T): boolean =>
          filter(result)
        );
      }

      return {
        data: rows,
        totalCount: rows.length,
      };
    } catch (error) {
      return {
        err: error,
        totalCount: 0,
      };
    }
  }

  async findOne(
    what: string,
    filter?: NodeFilterFn
  ): Promise<DBResponseInterface> {
    const dbResponse: DBResponseInterface = await this.find(what, filter);

    if (dbResponse.err) {
      return { err: dbResponse.err, totalCount: 0 };
    }

    const results: Node[] = dbResponse.data as Node[];
    const result: Node | null = results.length > 0 ? results[0] : null;

    return {
      data: result,
      totalCount: results.length,
    };
  }

  async findSome(
    what: string,
    queryOptions: QueryOptions,
    filter?: NodeFilterFn
  ): Promise<DBResponseInterface> {
    const dbResponse: DBResponseInterface = await this.find(what, filter);
    const { totalCount } = dbResponse;

    if (dbResponse.err) {
      return { err: dbResponse.err, totalCount: 0 };
    }

    const allResults: Node[] = dbResponse.data as Node[];
    const { from, limit = totalCount } = queryOptions;

    const cursorStartIdx = Math.max(
      allResults.findIndex((result: Node) => result.id === from),
      0
    );

    const cursorEndIdx = Math.min(limit + cursorStartIdx, allResults.length);

    const someResult =
      allResults.length > 0
        ? allResults.slice(cursorStartIdx, cursorEndIdx)
        : [];

    return {
      totalCount,
      data: someResult,
    };
  }

  async stop(): Promise<void> {
    await this.pool.end();
  }
}

export default DBClient;
