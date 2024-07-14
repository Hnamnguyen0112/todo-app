export interface CommonResponse<T, M> {
  data: T;
  error: string | null;
  message: string | null;
  meta: M;
  code: number;
  success: boolean;
}
