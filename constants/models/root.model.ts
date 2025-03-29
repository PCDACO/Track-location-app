export {};

declare global {
  type RootBankResponse<T> = {
    data: T;
    msg: string;
    code: number;
    success: boolean;
  };

  type RootRequest = {
    index: number;
    size: number;
    keyword: string;
  };

  type LastIdRootResquest = {
    limit: number;
    lastId: string;
  };

  type ListPaginationRequest = {
    limit: number;
    lastId?: number;
  };

  type RootResponse<T> = {
    value: T;
    isSuccess: boolean;
    message: string;
  };

  type Pagination<T> = {
    items: T[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    hasNext: boolean;
  };
}
