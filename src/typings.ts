export type ID = number;
export type MilliSeconds = number;
export type Author = {
  id: ID;
  firstName: string;
  lastName: string;
};

export type Post = {
  id: ID;
  authorId: ID;
  title: string;
  votes: number;
};

export type Comment = {
  id: ID;
  userId: ID;
  text: string;
  postId: ID;
};

export interface DBInterface {
  start(): Promise<DBInterface>;
  get(): Promise<DBInterface>;
  find(what: string, filter?: Function): Promise<any>;
  findOne(what: string, filter?: Function): Promise<any>;
  set(field: string, newValue: any): Promise<Error | boolean>;
  stop(): Promise<DBInterface>;
}
