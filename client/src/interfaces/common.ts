export interface CommonResponse<T, M> {
  data: T;
  error: string | null;
  message: string | null;
  meta: M;
  code: number;
  success: boolean;
}

export interface PaginationRequest {
  page: number;
  limit: number;
  keyword: string;
}

export interface PaginationMeta {
  total: number;
  totalPages: number;
}
