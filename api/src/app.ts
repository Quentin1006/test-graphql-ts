import express, { Application } from "express";

const app: Application = express();

app.get("/", (req, res) => {
  res.json({ hello: "Hello" });
});

app.get("/job-offers", (req, res) => {
  res.json({ err: "Not implemented yet" });
  /**
   * id
   * field
   * salary
   * company
   * position
   * startdate
   */
});

app.get("/companies", (req, res) => {
  res.json({ err: "Not implemented yet" });
});

app.get("/companies/companyId", (req, res) => {
  res.json({ err: "Not implemented yet" });
  /**
   * id
   * name
   * popularity
   * size
   */
});

app.get("/job-status/:userId", (req, res) => {
  res.json({ err: "Not implemented yet" });
  /*
    hasJob
    isSearching
    fieldInterest
    salaryRange

  */
});

export default app;
