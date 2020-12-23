import { Pool, QueryResult } from "pg";

export enum LogLevel {
  INFO = "info",
  ERROR = "error",
  DEBUG = "debug",
  WARNING = "warning",
}

export interface ILogger {
  log(level: LogLevel, message: string): void;
  info(message: string): void;
  warning(message: string): void;
  error(message: string): void;
  debug(message: string): void;
}

export type AppContext<LoggerInstance extends ILogger> = {
  dbClient: IDBClient;
  logger: LoggerInstance;
};
export interface IDBClient {
  connect(): Promise<Pool | Error>;
  query(text: string, params?: (string | number)[]): Promise<QueryResult>;
  stop(): Promise<void>;
}

export type JobOffer = {
  id: number;
  fields: string[];
  salary: string;
  company: Company;
  position: string;
  startdate: Date;
};

export type Company = {
  id: number;
  name: string;
  popularity: number;
  size: number;
};

export type UserJobStatus = {
  hasJob: boolean;
  isSearching: true;
  fieldInterest: string;
  salaryRange: SalaryRange;
};

export type SalaryRange = {
  minSalary: number;
  maxSalary: number;
};

export interface IJobController {
  getOffers(): Promise<IControllerResponse<JobOffer>>;
  getOffer(offerId: number): Promise<IControllerResponse<JobOffer>>;
  getOffersByCompany(companyId: number): Promise<IControllerResponse<JobOffer>>;
}

export interface ICompanyController {
  getCompanies(): Promise<IControllerResponse<Company>>;
  getCompany(companyId: number): Promise<IControllerResponse<Company>>;
}

export interface IControllerResponse<T> {
  data: Array<T>;
  err?: Error;
  info?: any;
}
