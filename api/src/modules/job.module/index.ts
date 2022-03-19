import CompanyRouter from "./job.router";

import { IAppContext, IDBClient, ILogger, Module } from "../../typings";

const CompanyModule = (ctx: IAppContext<IDBClient, ILogger>): Module => {
  return {
    basePath: "/companies",
    router: CompanyRouter(ctx),
  };
};

export default CompanyModule;
