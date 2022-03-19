import express, { Router as ExpressRouter } from "express";

export default class Router {
  protected globalRouter = express.Router();

  register(path: string, router: ExpressRouter): void {
    this.globalRouter.use(path, router);
  }

  get router(): ExpressRouter {
    return this.globalRouter;
  }
}
