import express, { Router } from "express";
import { verifyUser } from "../../helpers";

import JobController from "./job.controller";

import { IAppContext, IDBClient, IJobController, ILogger } from "../../typings";

export default <DBClient extends IDBClient, Logger extends ILogger>(
  ctx: IAppContext<DBClient, Logger>,
): Router => {
  const router = express.Router();
  const jobController: IJobController = JobController(ctx.dbClient);

  router.use("*", verifyUser);

  router.get("/companies", async (req, res) => {
    const ctrlResponse = await companyController.getCompanies();
    res.json(ctrlResponse);
  });

  router.get("/companies/:companyId", async (req, res) => {
    const companyId = Number(req.params.companyId);
    const ctrlResponse = await companyController.getCompany(companyId);
    res.json(ctrlResponse);
  });

  return router;
};
