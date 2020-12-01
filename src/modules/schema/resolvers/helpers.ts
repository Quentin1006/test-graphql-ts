import {
  ResponseConnection,
  DBResponseInterface,
  Node,
} from "../../../typings";

export const buildPageInfo = (data: Node[], totalCount: number) => {
  const lastCount: number = data.length - 1;
  return {
    startCursor: data[0].id,
    endCursor: data[lastCount].id,
    hasNextPage: lastCount < totalCount - 1,
  };
};

export const formatPaginatedResponse = (
  resp: DBResponseInterface
): ResponseConnection => {
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
