import express from "express";
import { verifyUser } from "./helper";

import JobController from "../controllers/job.controller";
import CompanyController from "../controllers/company.controller";

import { AppContext, ICompanyController, IJobController } from "../typings";

const router = express.Router();

export default (ctx: AppContext) => {
  // @TODO: register controller automatically
  const jobController: IJobController = JobController(ctx.dbClient);
  const companyController: ICompanyController = CompanyController(ctx.dbClient);

  router.use("*", verifyUser);

  router.get("/", (req, res) => {
    res.json({ hello: "Hello" });
  });

  router.get("/job-offers", async (req, res) => {
    const ctrlResponse = await jobController.getOffers();
    res.json(ctrlResponse);
  });

  router.get("/job-offers/:offerId", async (req, res) => {
    const offerId: number = Number(req.params.offerId);
    const ctrlResponse = await jobController.getOffer(offerId);
    res.json(ctrlResponse);
  });

  router.get("/job-offers/company/:companyId", async (req, res) => {
    const companyId: number = Number(req.params.companyId);
    const ctrlResponse = await jobController.getOffersByCompany(companyId);
    res.json(ctrlResponse);
  });

  router.get("/companies", async (req, res) => {
    const ctrlResponse = await companyController.getCompanies();
    res.json(ctrlResponse);
  });

  router.get("/companies/:companyId", async (req, res) => {
    const companyId: number = Number(req.params.companyId);
    const ctrlResponse = await companyController.getCompany(companyId);
    res.json(ctrlResponse);
  });

  router.get("/user-management/user-status/:userId", (req, res) => {
    res.json({ err: "Not implemented yet" });
    /*
    hasJob
    isSearching
    fieldInterest
    salaryRange

  */
  });

  return router;
};
