import {
  User,
  Comment,
  Post,
  DBInterface,
  DBResponseInterface,
  ID,
  ResponseConnection,
} from "../../../typings";
import { formatPaginatedResponse } from "./helpers";

const resolvers = (db: DBInterface) => {
  return {
    Query: {
      users: async (): Promise<ResponseConnection> =>
        formatPaginatedResponse(await db.find("authors")),
      user: async (parent: any, args: any) => {
        const id: string = args.id;
        const resp: DBResponseInterface = await db.findOne(
          "authors",
          (author: User) => author.id == id
        );
        console.log(resp);
        return resp.data;
      },

      posts: async (parent: any, args: any): Promise<ResponseConnection> => {
        const limit: number = args.limit;
        return formatPaginatedResponse(await db.findSome("posts", { limit }));
      },

      post: async (parent: any, args: any) => {
        const id: string = args.id;
        return await db.findOne("post", (post: Post) => post.id == id);
      },

      project: async () => {
        return await db.find("project");
      },
      comments: async (): Promise<ResponseConnection> =>
        formatPaginatedResponse(await db.find("comments")),
      comment: async (id: ID) =>
        await db.findOne("post", (comment: Comment) => comment.id == id),
    },
    User: {
      posts: async (parent: any) => {
        return await db.find(
          "posts",
          (post: Post) => post.authorId === parent.id
        );
      },
      comments: async (parent: any, args: any): Promise<ResponseConnection> => {
        return formatPaginatedResponse(
          await db.findSome("comments", { limit: 10 }, (comment: Comment) => {
            return comment.userId === parent.id;
          })
        );
      },
    },
    Comment: {
      author: async (parent: any) => {
        return await db.findOne(
          "authors",
          (author: User) => author.id === parent.userId
        );
      },
      post: async (parent: any) => {
        const r_ = await db.findOne("posts", (post: Post) => {
          console.log({ post, parent });
          return post.id === parent.postId;
        });
      },
    },
    Post: {
      author: async (parent: any) => {
        const authorResult: DBResponseInterface = await db.findOne(
          "authors",
          (author: User) => author.id === parent.authorId
        );
        return authorResult.data;
      },
      comments: async (parent: any): Promise<ResponseConnection> => {
        return formatPaginatedResponse(
          await db.findSome(
            "comments",
            { limit: 10 },
            (comment: Comment) => comment.postId === parent.id
          )
        );
      },
    },
  };
};

export default resolvers;
