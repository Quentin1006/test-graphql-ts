import { Paginated, IDBResponse, Node, PageInfo } from "../../../../typings";

export const buildPageInfo = (data: Node[], totalCount: number): PageInfo => {
  const lastCount: number = data.length - 1;
  return {
    startCursor: data[0].id,
    endCursor: data[lastCount].id,
    hasNextPage: lastCount < totalCount - 1,
  };
};

export const formatPaginatedResponse = (resp: IDBResponse): Paginated<any> => {
  if (resp.err) {
    throw resp.err;
  }

  if (!Array.isArray(resp.data)) {
    throw new Error("Cannot build pagination out of an object");
  }
  const data: Node[] = resp.data as Node[];
  const totalCount: number = resp.totalCount;

  return {
    pageInfo: buildPageInfo(data, totalCount),
    nodes: data,
    totalCount,
  };
};
