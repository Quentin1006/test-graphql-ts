import { Pool } from "pg";

export type ID = string | number;
export type MilliSeconds = number;

export type Node = {
  id: ID;
};

export interface User extends Node {
  id: ID;
  firstName: string;
  lastName: string;
}

export interface Post extends Node {
  id: ID;
  authorId: ID;
  title: string;
  votes: number;
}

export interface Comment extends Node {
  id: ID;
  userId: ID;
  text: string;
  postId: ID;
}

export interface JobOffer extends Node {
  id: ID;
  salary: string;
  companyName: string;
  position: string;
  startdate: number;
}

export type QueryOptions = {
  from?: string;
  limit?: number;
};

export type Data = Node | Node[] | [] | null | undefined;

export interface DBResponseInterface {
  data?: Data;
  totalCount: number;
  err?: Error;
}

export type PageInfo = {
  endCursor: number | string;
  hasNextPage: boolean;
  startCursor: number | string;
};

export interface ResponseConnection {
  nodes: Data;
  pageInfo: PageInfo;
  totalCount: number;
}

export type NodeFilterFn = (result: any) => boolean;

export interface DBInterface {
  connect(): Promise<Pool | Error>;
  find(what: string, filter?: NodeFilterFn): Promise<DBResponseInterface>;
  findSome(
    what: string,
    queryOptions: QueryOptions,
    filter?: NodeFilterFn
  ): Promise<DBResponseInterface>;
  findOne(what: string, filter?: NodeFilterFn): Promise<DBResponseInterface>;
  stop(): Promise<void>;
}
