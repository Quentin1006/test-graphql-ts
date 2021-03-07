import { Application } from "express";
import { ApolloServer, ApolloServerExpressConfig } from "apollo-server-express";

type ServerOptions = {
  port: number;
  graphqlOptions: ApolloServerExpressConfig;
};

class GraphQLServer {
  protected port: number;
  protected app: Application;
  protected server: ApolloServer;

  constructor(app: Application, options: ServerOptions) {
    this.port = options.port || 3000;
    this.app = app;
    this.server = new ApolloServer({
      ...options.graphqlOptions,
    });

    this.server.applyMiddleware({ app: this.app });
  }

  start(): Promise<ApolloServer> {
    return new Promise((resolve) => {
      this.app.listen(this.port, () => {
        resolve(this.server);
      });
    });
  }
}

export default GraphQLServer;
