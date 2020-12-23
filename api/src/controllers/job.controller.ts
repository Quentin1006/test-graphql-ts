import {
  IControllerResponse,
  IDBClient,
  JobOffer,
  IJobController,
} from "../typings";
import { QueryResult } from "pg";

export default (dbClient: IDBClient): IJobController => {
  const getOffers = async (): Promise<IControllerResponse<JobOffer>> => {
    const query = `
      SELECT *
      FROM joboffer AS jo
      INNER JOIN company AS c
        ON c.company__id = jo.joboffer__company_id
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
        id: row.joboffer__id,
        salary: row.joboffer__salary,
        position: row.joboffer__position,
        startdate: row.joboffer__startdate,
        fields: [],
        company: {
          id: row.company__id,
          name: row.company__name,
          popularity: row.company__popularity,
          size: row.company__size,
        },
      };
    });

    return {
      data,
    };
  };

  const getOffer = async (
    offerId: number
  ): Promise<IControllerResponse<JobOffer>> => {
    const query = `
      SELECT *
      FROM joboffer AS jo
      INNER JOIN company AS c
        ON c.companny__id = jo.joboffer__company_id
      WHERE jo.joboffer__id = $1
    `;
    let result: QueryResult;
    try {
      result = await dbClient.query(query, [offerId]);
    } catch (error) {
      return {
        err: new Error(error),
        data: [],
      };
    }

    if (result.rows.length === 0) {
      return {
        data: [],
        err: new Error(`No result with the following offerId: ${offerId}`),
      };
    }
    const data = result.rows.map((row: any) => {
      return {
        id: row.joboffer__id,
        salary: row.joboffer__salary,
        position: row.joboffer__position,
        startdate: row.joboffer__startdate,
        fields: [],
        company: {
          id: row.company__id,
          name: row.company__name,
          popularity: row.company__popularity,
          size: row.company__size,
        },
      };
    });

    return {
      data,
    };
  };

  const getOffersByCompany = async (companyId: number) => {
    const query = `
      SELECT *
      FROM joboffer AS jo
      INNER JOIN company AS c
        ON c.companny__id = jo.joboffer__company_id
      WHERE jo.joboffer__company_id = $1
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
        err: new Error(`No result with the following company: ${companyId}`),
      };
    }

    const data = result.rows.map((row: any) => {
      return {
        id: row.joboffer__id,
        salary: row.joboffer__salary,
        position: row.joboffer__position,
        startdate: row.joboffer__startdate,
        fields: [],
        company: {
          id: row.company__id,
          name: row.company__name,
          popularity: row.company__popularity,
          size: row.company__size,
        },
      };
    });

    return {
      data,
    };
  };

  return {
    getOffer,
    getOffers,
    getOffersByCompany,
  };
};

// Recup les fields liés à un joboffer
