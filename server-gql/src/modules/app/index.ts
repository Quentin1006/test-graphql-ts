import express, { Application } from "express";
import { graphqlHTTP, OptionsData } from "express-graphql";

export default (grapqhlOptions: OptionsData): Application => {
  const app: Application = express();

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: grapqhlOptions.schema,
      graphiql: grapqhlOptions.graphiql,
    })
  );

  app.get("/", (req, res) => {
    res.send("Hello From Graphql");
  });

  return app;
};
