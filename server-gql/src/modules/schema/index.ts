import { DBInterface } from "../../typings";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLSchema } from "graphql";

import resolversFactory from "./resolvers";
import typeDefs from "./type-defs";

export const createTypeDefsAndResolvers = (db: DBInterface): any => {
  const resolvers = resolversFactory(db);
  return {
    typeDefs,
    resolvers,
  };
};

export default (db: DBInterface): GraphQLSchema => {
  const resolvers = resolversFactory(db);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  return schema;
};
