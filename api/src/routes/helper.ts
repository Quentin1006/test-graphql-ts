import { Request, Response, NextFunction } from "express";

const nodeEnv = process.env.NODE_ENV;

export const verifyUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // const adminKeyHeader: string = req.headers["adminkey"];
  if (nodeEnv === "development") {
    next();
  } else {
    res.status(401).send({ error: "Unauthorized", code: 401 });
  }
};
