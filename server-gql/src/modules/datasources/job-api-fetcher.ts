import { RESTDataSource } from "apollo-datasource-rest";

export default class JobAPIFetcher extends RESTDataSource {
  constructor(baseURL: string) {
    super();
    this.baseURL = baseURL;
  }

  async getJobOffers(from = 0, limit = -1): Promise<any> {
    const { data, err } = await this.get("/job-offers", {
      from,
      limit,
    });

    if (err) throw err;
    return data;
  }

  async getJobOffer(offerId: number): Promise<any> {
    const { data, err } = await this.get(`/job-offers/${offerId}`);

    if (err) throw err;
    return data[0];
  }
}
