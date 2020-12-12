import { Application } from "express";
import http, { Server } from "http";

type ServerOptions = {
  port: number;
};

class ExpressServer {
  protected port: number = 3000;
  protected app: Application;
  protected server: Server;

  constructor(app: Application, options: ServerOptions) {
    this.port = options.port;
    this.app = app;
    this.server = http.createServer(this.app);
  }

  start(): Promise<Server> {
    return new Promise((resolve) => {
      this.server.listen(this.port, () => {
        resolve(this.server);
      });
    });
  }
}

export default ExpressServer;

// console.log(
//   `Running a GraphQL API server at localhost:${this.port}/graphql`
// );
