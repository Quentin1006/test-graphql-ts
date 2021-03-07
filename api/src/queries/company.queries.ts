import { DBQuery } from "../typings";

export const buildSelectCompaniesQuery = (): DBQuery => {
  const query = `
    SELECT *
    FROM company AS c
  `;

  return {
    query,
    params: [],
  };
};

export const buildSelectCompanyQuery = (companyId: number): DBQuery => {
  const query = `
      SELECT *
      FROM company AS c 
      WHERE c.company__id = $1
    `;

  return {
    query,
    params: [companyId],
  };
};
