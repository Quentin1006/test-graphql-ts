import { Application } from "express";
import http, { Server } from "http";

import { IServer } from "../../typings";

type ServerOptions = {
  port: number;
};

class HTTPServer implements IServer {
  readonly DEFAULT_PORT = 3333;

  protected port: number;
  protected app: Application;
  protected server: Server;

  constructor(app: Application, options?: ServerOptions) {
    this.port = options?.port || this.DEFAULT_PORT;
    this.app = app;
    this.server = http.createServer(this.app);
  }

  start(): Promise<Server> {
    return new Promise((resolve) => {
      this.server.listen(this.port, () => {
        console.log(`Server running on port ${this.port}`);
        resolve(this.server);
      });
    });
  }

  stop(): Promise<boolean> {
    // @TODO: Implement real logic
    return Promise.resolve(true);
  }
}

export default HTTPServer;
