import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLSchema } from "graphql";

import resolvers from "./resolvers";
import typeDefs from "./type-defs";

export const createTypeDefsAndResolvers = (): any => ({
  typeDefs,
  resolvers,
});

export default (): GraphQLSchema => makeExecutableSchema({ typeDefs, resolvers });
