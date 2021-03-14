import { Pool, QueryResult } from "pg";
import { Server } from "http";

export enum LogLevel {
  INFO = "info",
  ERROR = "error",
  DEBUG = "debug",
  WARNING = "warning",
}

export interface IServer {
  start(): Promise<Server>;
  stop(): Promise<boolean>;
}

export interface IDBClient {
  connect(): Promise<Pool | Error>;
  query(text: string, params?: any[]): Promise<QueryResult>;
  stop(): Promise<void>;
}

export interface ILogger {
  log(level: LogLevel, message: string): void;
  info(message: string): void;
  warning(message: string): void;
  error(message: string): void;
  debug(message: string): void;
}

export interface IAdapter {
  exposed: any;
}

export interface IAppContext<
  DBClientInstance extends IDBClient,
  LoggerInstance extends ILogger
> {
  dbClient: DBClientInstance;
  logger: LoggerInstance;
}

export type DBQuery = {
  query: string;
  params: any[];
};

export type JobOffer = {
  id: number;
  fields: string[];
  salary: string;
  company: Company;
  position: string;
  startdate: Date;
};

export type JobOfferPayload = {
  id?: number;
  fields?: string[];
  salary: SalaryRange;
  companyId: number;
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
  getOffers(): Promise<IDataArrayResponse<JobOffer>>;
  getOffer(offerId: number): Promise<IDataArrayResponse<JobOffer>>;
  getOffersFromCompany(
    companyId: number,
  ): Promise<IDataArrayResponse<JobOffer>>;
  createOrUpdateOffer(
    offerPayload: JobOfferPayload,
  ): Promise<IDataArrayResponse<JobOffer>>;
}

export interface ICompanyController {
  getCompanies(): Promise<IDataArrayResponse<Company>>;
  getCompany(companyId: number): Promise<IDataArrayResponse<Company>>;
}

export interface IDataArrayResponse<T> {
  data: Array<T>;
  err?: Error;
  info?: any;
}

export interface IDataResponse<T> {
  data?: T;
  err?: Error;
  info?: any;
}

export interface IPayloadSchema<Payload> {
  validate(p: Payload): Promise<IDataResponse<Payload>>;
}
