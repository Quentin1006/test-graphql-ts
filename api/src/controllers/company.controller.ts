import {
  IControllerResponse,
  IDBClient,
  Company,
  ICompanyController,
} from "../typings";
import { QueryResult } from "pg";

export default (dbClient: IDBClient): ICompanyController => {
  const getCompanies = async (): Promise<IControllerResponse<Company>> => {
    const query = `
      SELECT *
      FROM company AS c
    `;
    let result: QueryResult;
    try {
      result = await dbClient.query(query);
    } catch (error) {
      return {
        err: new Error(error),
        data: [],
      };
    }

    const data = result.rows.map((row: any) => {
      return {
        id: row.company__id,
        name: row.company__name,
        popularity: row.company__popularity,
        size: row.company__size,
      };
    });

    return {
      data,
    };
  };

  const getCompany = async (
    companyId: number
  ): Promise<IControllerResponse<Company>> => {
    const query = `
      SELECT *
      FROM company AS c 
      WHERE c.company__id = $1
    `;
    let result: QueryResult;
    try {
      result = await dbClient.query(query, [companyId]);
    } catch (error) {
      return {
        err: new Error(error),
        data: [],
      };
    }

    if (result.rows.length === 0) {
      return {
        data: [],
        err: new Error(`No result with the following offerId: ${companyId}`),
      };
    }
    const data = result.rows.map((row: any) => {
      return {
        id: row.company__id,
        name: row.company__name,
        popularity: row.company__popularity,
        size: row.company__size,
      };
    });

    return {
      data,
    };
  };

  return {
    getCompanies,
    getCompany,
  };
};

// Recup les fields liés à un joboffer
