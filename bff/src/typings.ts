import { RESTDataSource } from "apollo-datasource-rest";

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

export type Paginated<Entity> = {
  nodes: Entity[];
  pageInfo: PageInfo;
  totalCount: number;
};

export interface IDBResponse {
  data?: Data;
  totalCount: number;
  err?: Error;
}

export type PageInfo = {
  endCursor: number | string;
  hasNextPage: boolean;
  startCursor: number | string;
};

export type NodeFilterFn = (result: any) => boolean;

export interface IDBClient {
  connect(): Promise<boolean | Error>;
  find(what: string, filter?: NodeFilterFn): Promise<IDBResponse>;
  findSome(what: string, queryOptions: QueryOptions, filter?: NodeFilterFn): Promise<IDBResponse>;
  findOne(what: string, filter?: NodeFilterFn): Promise<IDBResponse>;
  stop(): Promise<void>;
}

export interface IAPIFetchersMap {
  [name: string]: RESTDataSource;
}

/**
 * Est Adapter tout connecteur vers un service extérieur
 * P. ex: DBClient est un adapteur permettant de communiquer avec la DB
 */
export interface IAdapter {
  exposed: any;
}
export interface IRunner {
  (...adapters: IAdapter[]): void;
}

export interface IGraphQLContext {
  db: IDBClient;
  dataSources: any;
}

export interface IMap {
  [name: string]: any;
}
