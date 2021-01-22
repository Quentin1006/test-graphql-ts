import {
  User,
  Comment,
  Post,
  DBInterface,
  DBResponseInterface,
  JobOffer,
  ResponseConnection,
  QueryOptions,
} from "../../../typings";
import { formatPaginatedResponse } from "./helpers";

const resolvers = (db: DBInterface): any => {
  return {
    Query: {
      users: async (root: any, args: any): Promise<ResponseConnection> => {
        const { limit }: QueryOptions = args;
        return formatPaginatedResponse(await db.findSome("users", { limit }));
      },

      user: async (root: any, args: any) => {
        const id: string = args.id;
        const resp: DBResponseInterface = await db.findOne(
          "users",
          (author: User) => author.id === id
        );
        return resp.data;
      },

      posts: async (root: any, args: any): Promise<ResponseConnection> => {
        const limit: number = args.limit;
        return formatPaginatedResponse(await db.findSome("posts", { limit }));
      },

      post: async (root: any, args: any) => {
        const id: string = args.id;
        return (await db.findOne("posts", (post: Post) => post.id == id)).data;
      },

      project: async () => {
        return (await db.find("project")).data;
      },

      comments: async (): Promise<ResponseConnection> =>
        formatPaginatedResponse(await db.find("comments")),
      comment: async (root: any, args: any) => {
        const id: string = args.id;
        const resp: DBResponseInterface = await db.findOne(
          "comments",
          (comment: Comment) => comment.id === id
        );

        return resp.data;
      },

      joboffers: async (
        root: any,
        args: any,
        context: any
      ): Promise<ResponseConnection> => {
        const jobAPIFetcher: any = context.dataSources.jobAPIFetcher;
        let jobOffers;
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
        root: any,
        args: any,
        context: any
      ): Promise<JobOffer | Error> => {
        const jobAPIFetcher: any = context.dataSources.jobAPIFetcher;
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
      posts: async (user: any, args: any) => {
        const { limit }: QueryOptions = args;
        return formatPaginatedResponse(
          await db.findSome(
            "posts",
            { limit },
            (post: Post) => post.authorId === user.id
          )
        );
      },
      comments: async (user: any): Promise<ResponseConnection> => {
        return formatPaginatedResponse(
          await db.findSome("comments", { limit: 10 }, (comment: Comment) => {
            return comment.userId === user.id;
          })
        );
      },
    },
    Comment: {
      author: async (comment: any) => {
        const authorResult: DBResponseInterface = await db.findOne(
          "users",
          (author: User) => author.id === comment.userId
        );
        return authorResult.data;
      },
      post: async (comment: any) => {
        const postResult: DBResponseInterface = await db.findOne(
          "posts",
          (post: Post) => post.id === comment.postId
        );
        return postResult.data;
      },
    },
    Post: {
      author: async (post: any) => {
        const authorResult: DBResponseInterface = await db.findOne(
          "users",
          (author: User) => author.id === post.authorId
        );
        return authorResult.data;
      },
      comments: async (post: any): Promise<ResponseConnection> => {
        return formatPaginatedResponse(
          await db.findSome(
            "comments",
            { limit: 10 },
            (comment: Comment): boolean => comment.postId === post.id
          )
        );
      },
    },

    JobOffer: {
      companyName: (joboffer: any) => joboffer.company.name,
    },
  };
};

export default resolvers;
