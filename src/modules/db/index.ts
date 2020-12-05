import {
  DBResponseInterface,
  DBInterface,
  Node,
  QueryOptions,
} from "../../typings";

import { wait } from "../../utils";
import fs, { Dirent } from "fs";
import path from "path";

class DB implements DBInterface {
  protected started: boolean;
  protected content: any;
  constructor() {
    this.started = false;
    this.content = {};

    this.set = this.set.bind(this);
  }

  private async readStore(): Promise<Object> {
    const files: Dirent[] = await fs.promises.readdir(
      path.resolve(__dirname, "./store"),
      {
        withFileTypes: true,
      }
    );
    const content = files.reduce((acc, _file: Dirent) => {
      const filename = _file.name;
      if (!_file.isFile() || !filename.match(/.json$/)) {
        return acc;
      }

      const fileContent = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "./store", filename), {
          encoding: "utf8",
        })
      );

      return {
        ...acc,
        ...fileContent,
      };
    }, {});
    return content;
  }

  async start(): Promise<DB> {
    if (!this.started) {
      await wait();
      this.content = await this.readStore();
      this.started = true;
    } else {
      console.warn("DB is already started");
    }

    return this;
  }

  async find(what: string, filter?: Function): Promise<DBResponseInterface> {
    if (!this.started) {
      throw new Error("No connection to DB");
    }
    await wait();
    let results: Node[] = this.content[what] as Node[];
    if (filter) {
      results = results.filter((result: Node) => filter(result));
    }
    return {
      data: results,
      totalCount: results.length,
    };
  }

  async findOne(what: string, filter?: Function): Promise<DBResponseInterface> {
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
    filter?: Function
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

  get(): Error | any {
    if (!this.started) {
      throw new Error("No connection to DB");
    }
    return this.content;
  }

  async set(field: string, newValue: any): Promise<Error | boolean> {
    if (!this.started) {
      throw new Error("No connection to DB");
    }
    try {
      await wait();
      this.content[field] = newValue;
      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  }

  async stop(): Promise<DB> {
    await wait();
    this.started = false;
    return this;
  }
}

export default DB;
