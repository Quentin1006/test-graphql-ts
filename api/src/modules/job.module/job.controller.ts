import { QueryResult } from "pg";

import {
  IDataResponse,
  IDataArrayResponse,
  IDBClient,
  JobOffer,
  JobOfferPayload,
  IJobController,
  DBQuery,
} from "../../typings";

import {
  buildInsertOfferQuery,
  buildSelectOfferQuery,
  buildSelectOffersQuery,
  buildSelectOffersFromCompanyQuery,
  buildUpdateOfferQuery,
} from "../../queries/offer.queries";

import { buildSelectCompanyQuery } from "../../queries/company.queries";

import JobPayloadSchema from "../../schema/offer-payload.schema";

export default (dbClient: IDBClient): IJobController => {
  const getOffers = async (): Promise<IDataArrayResponse<JobOffer>> => {
    const { query, params } = buildSelectOffersQuery();
    let result: QueryResult;
    try {
      result = await dbClient.query(query, params);
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
    offerId: number,
  ): Promise<IDataArrayResponse<JobOffer>> => {
    const { query, params } = buildSelectOfferQuery(offerId);
    let result: QueryResult;
    try {
      result = await dbClient.query(query, params);
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

  const getOffersFromCompany = async (companyId: number) => {
    const { query, params } = buildSelectOffersFromCompanyQuery(companyId);
    let result: QueryResult;
    try {
      result = await dbClient.query(query, params);
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

  const createOrUpdateOffer = async (
    offerPayload: JobOfferPayload,
  ): Promise<IDataArrayResponse<JobOffer>> => {
    const { err, data }: IDataResponse<JobOfferPayload> =
      await JobPayloadSchema.validate(offerPayload);
    if (err) {
      return { err, data: [] };
    }

    const validatedJobOfferPayload = data as JobOfferPayload;

    const offerQuery: DBQuery = validatedJobOfferPayload.id
      ? buildInsertOfferQuery(validatedJobOfferPayload)
      : buildUpdateOfferQuery(validatedJobOfferPayload);

    let resultOffer: QueryResult;
    let resultCompany: QueryResult;
    try {
      resultOffer = await dbClient.query(offerQuery.query, offerQuery.params);
      const companyQuery = buildSelectCompanyQuery(
        validatedJobOfferPayload.companyId,
      );
      resultCompany = await dbClient.query(
        companyQuery.query,
        companyQuery.params,
      );
    } catch (error) {
      return {
        err: new Error(error),
        data: [],
      };
    }

    return {
      data: resultOffer.rows.map((offerRow: any) => {
        return {
          id: offerRow.joboffer__id,
          salary: offerRow.joboffer__salary,
          position: offerRow.joboffer__position,
          startdate: offerRow.joboffer__startdate,
          fields: [],
          company: resultCompany.rows.map((companyRow: any) => ({
            id: companyRow.company__id,
            name: companyRow.company__name,
            popularity: companyRow.company__popularity,
            size: companyRow.company__size,
          }))[0],
        };
      }),
    };
  };

  return {
    createOrUpdateOffer,
    getOffer,
    getOffers,
    getOffersFromCompany,
  };
};

// Recup les fields liés à un joboffer
