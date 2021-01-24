import {
  User,
  Comment,
  Post,
  IGraphQLContext,
  IDBResponse,
  IMap,
  JobOffer,
  Paginated,
  QueryOptions,
  Data,
} from "../../../typings";
import { formatPaginatedResponse } from "./helpers";

const resolvers = {
  Query: {
    users: async (root: IMap, args: IMap, { db }: IGraphQLContext): Promise<Paginated<User>> => {
      const { limit }: QueryOptions = args;
      return formatPaginatedResponse(await db.findSome("users", { limit }));
    },

    user: async (root: IMap, args: IMap, { db }: IGraphQLContext): Promise<User> => {
      const id: string = args.id;
      const resp: IDBResponse = await db.findOne("users", (author: User) => author.id === id);
      return resp.data as User;
    },

    posts: async (root: IMap, args: IMap, { db }: IGraphQLContext): Promise<Paginated<Post>> => {
      const limit: number = args.limit;
      return formatPaginatedResponse(await db.findSome("posts", { limit }));
    },

    post: async (root: IMap, args: IMap, { db }: IGraphQLContext): Promise<Post> => {
      const id: string = args.id;
      return (await db.findOne("posts", (post: Post) => post.id == id)).data as Post;
    },

    project: async (root: IMap, args: IMap, { db }: IGraphQLContext): Promise<Data> => {
      return (await db.find("project")).data;
    },

    comments: async (
      root: IMap,
      args: IMap,
      { db }: IGraphQLContext,
    ): Promise<Paginated<Comment>> => formatPaginatedResponse(await db.find("comments")),

    comment: async (root: IMap, args: IMap, { db }: IGraphQLContext): Promise<Comment> => {
      const id: string = args.id;
      const resp: IDBResponse = await db.findOne(
        "comments",
        (comment: Comment) => comment.id === id,
      );

      return resp.data as Comment;
    },

    joboffers: async (
      root: IMap,
      args: IMap,
      { dataSources }: IGraphQLContext,
    ): Promise<Paginated<JobOffer>> => {
      const jobAPIFetcher = dataSources.jobAPIFetcher;
      let jobOffers: JobOffer[];
      try {
        jobOffers = await jobAPIFetcher.getJobOffers();
      } catch (err) {
        console.log({ err });
        return formatPaginatedResponse({
          err,
          totalCount: -1,
        });
      }

      return formatPaginatedResponse({
        data: jobOffers,
        totalCount: jobOffers.length,
      });
    },

    joboffer: async (
      root: IMap,
      args: IMap,
      { dataSources }: IGraphQLContext,
    ): Promise<JobOffer | Error> => {
      const jobAPIFetcher = dataSources.jobAPIFetcher;
      let jobOffer: JobOffer;
      // TODO: replace with an id as argument
      try {
        jobOffer = await jobAPIFetcher.getJobOffer(1);
      } catch (err) {
        console.log({ err });
        return err;
      }
      return jobOffer;
    },
  },
  User: {
    posts: async (user: User, args: IMap, { db }: IGraphQLContext): Promise<Paginated<Post>> => {
      const { limit }: QueryOptions = args;
      return formatPaginatedResponse(
        await db.findSome("posts", { limit }, (post: Post) => post.authorId === user.id),
      );
    },
    comments: async (
      user: User,
      args: IMap,
      { db }: IGraphQLContext,
    ): Promise<Paginated<Comment>> => {
      return formatPaginatedResponse(
        await db.findSome("comments", { limit: 10 }, (comment: Comment) => {
          return comment.userId === user.id;
        }),
      );
    },
  },
  Comment: {
    author: async (comment: Comment, args: IMap, { db }: IGraphQLContext): Promise<User> => {
      const authorResult: IDBResponse = await db.findOne(
        "users",
        (author: User) => author.id === comment.userId,
      );
      return authorResult.data as User;
    },
    post: async (comment: Comment, args: IMap, { db }: IGraphQLContext): Promise<Post> => {
      const postResult: IDBResponse = await db.findOne(
        "posts",
        (post: Post) => post.id === comment.postId,
      );
      return postResult.data as Post;
    },
  },
  Post: {
    author: async (post: Post, args: IMap, { db }: IGraphQLContext): Promise<User> => {
      const authorResult: IDBResponse = await db.findOne(
        "users",
        (author: User) => author.id === post.authorId,
      );
      return authorResult.data as User;
    },
    comments: async (
      post: Post,
      args: IMap,
      { db }: IGraphQLContext,
    ): Promise<Paginated<Comment>> => {
      return formatPaginatedResponse(
        await db.findSome(
          "comments",
          { limit: 10 },
          (comment: Comment): boolean => comment.postId === post.id,
        ),
      );
    },
  },

  JobOffer: {
    companyName: (joboffer: any): string => joboffer.company.name,
  },
};

export default resolvers;
