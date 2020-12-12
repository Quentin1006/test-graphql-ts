import express, { Application } from "express";
import { graphqlHTTP, OptionsData } from "express-graphql";

export default (grapqhlOptions: OptionsData) => {
  const app: Application = express();

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: grapqhlOptions.schema,
      graphiql: grapqhlOptions.graphiql,
    })
  );

  app.get("/", (req, res) => {
    res.send("Hello");
  });

  return app;
};
