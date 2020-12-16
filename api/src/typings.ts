import { Pool, QueryResult } from "pg";

export interface DBInterface {
  connect(): Promise<Pool | Error>;
  query(text: string, params: string[]): Promise<QueryResult>;
  stop(): Promise<void>;
}

export type JobOffers = {
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
