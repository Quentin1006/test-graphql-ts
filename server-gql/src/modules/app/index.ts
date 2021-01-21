import express, { Application } from "express";

export default (): Application => {
  const app: Application = express();

  app.get("/", (req, res) => {
    res.send("Hello From Graphql");
  });

  return app;
};
