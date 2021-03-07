import { Application } from "express";
import http, { Server } from "http";

type ServerOptions = {
  port: number;
};

class ExpressServer {
  protected port: number;
  protected app: Application;
  protected server: Server;

  constructor(app: Application, options?: ServerOptions) {
    this.port = options?.port || 3333;
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
}

export default ExpressServer;
