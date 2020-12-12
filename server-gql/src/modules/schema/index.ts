import { DBInterface } from "../../typings";
import { makeExecutableSchema } from "@graphql-tools/schema";

import resolversFactory from "./resolvers";
import typeDefs from "./type-defs";

export default (db: DBInterface) => {
  const resolvers = resolversFactory(db);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  return schema;
};
