import { DBQuery, JobOfferPayload } from "../typings";

export const buildSelectOffersQuery = (): DBQuery => {
  const query = `
    SELECT *
    FROM joboffer AS jo
    INNER JOIN company AS c
      ON c.company__id = jo.joboffer__company_id
  `;

  return {
    query,
    params: [],
  };
};

export const buildSelectOfferQuery = (offerId: number): DBQuery => {
  const query = `
    SELECT *
    FROM joboffer AS jo
    INNER JOIN company AS c
      ON c.company__id = jo.joboffer__company_id
    WHERE jo.joboffer__id = $1
  `;

  return {
    query,
    params: [offerId],
  };
};

export const buildSelectOffersFromCompanyQuery = (
  companyId: number
): DBQuery => {
  const query = `
    SELECT *
    FROM joboffer AS jo
    INNER JOIN company AS c
      ON c.company__id = jo.joboffer__company_id
    WHERE jo.joboffer__company_id = $1
  `;
  return {
    query,
    params: [companyId],
  };
};

export const buildUpdateOfferQuery = (payload: JobOfferPayload): DBQuery => {
  const { id, position, startdate, salary, companyId } = payload;
  const query = `
    UPDATE joboffer 
    SET
      joboffer__position = $1,
      joboffer__startdate = $2,
      joboffer__salary = $3,
      joboffer__company_id = $4
    WHERE joboffer__id = $5
    RETURNING *
  `;

  return {
    query,
    params: [position, startdate, salary, companyId, id],
  };
};

export const buildInsertOfferQuery = (payload: JobOfferPayload): DBQuery => {
  let { position, salary: salaryRange, startdate, companyId } = payload;
  // salary is redefined here
  // For simplicity in the db we store the min and max range as one string
  const salary = `${salaryRange.minSalary}-${salaryRange.maxSalary}`;
  const query = `
    INSERT INTO joboffer (
      joboffer__position,
      joboffer__startdate,
      joboffer__salary,
      joboffer__company_id
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  return {
    query,
    params: [position, startdate, salary, companyId],
  };
};
