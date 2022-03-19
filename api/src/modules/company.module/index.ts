import CompanyRouter from "./company.router";

import { IAppContext, IDBClient, ILogger } from "../../typings";

const CompanyModule = (ctx: IAppContext<IDBClient, ILogger>) => {
  return {
    basePath: "/companies",
    router: CompanyRouter(ctx),
  };
};

export default CompanyModule;
