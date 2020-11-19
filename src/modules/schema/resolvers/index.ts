import { Author, Comment, Post, DBInterface, ID } from "../../../typings";

const resolvers = (db: DBInterface) => {
  return {
    Query: {
      authors: async () => await db.find("authors"),
      author: async (id: ID) =>
        await db.findOne("authors", (author: Author) => author.id == id),
      posts: async () => await db.find("posts"),
      post: async (id: ID) =>
        await db.findOne("post", (post: Post) => post.id == id),
      project: async () => {
        return await db.find("project");
      },
      comments: async () => await db.find("comments"),
      comment: async (id: ID) =>
        await db.findOne("post", (comment: Comment) => comment.id == id),
    },
    Author: {
      posts: async (parent: any) => {
        return await db.find(
          "posts",
          (post: Post) => post.authorId === parent.id
        );
      },
      comments: async (parent: any) => {
        return await db.find("comments", (comment: Comment) => {
          console.log({ userId: comment.userId, parent });
          return comment.userId === parent.id;
        });
      },
    },
    Comment: {
      author: async (parent: any) => {
        return await db.findOne(
          "authors",
          (author: Author) => author.id === parent.userId
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
        return await db.findOne(
          "authors",
          (author: Author) => author.id === parent.authorId
        );
      },
      comments: async (parent: any) => {
        return await db.find(
          "comments",
          (comment: Comment) => comment.postId === parent.id
        );
      },
    },
  };
};

export default resolvers;
