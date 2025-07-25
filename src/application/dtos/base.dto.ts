import { Request, Response, NextFunction } from 'express';

//#region TYPES
export type SortByType = 'asc' | 'desc';
export type OrderByType = 'createdAt' | 'updatedAt';

export type ErrorHandlerType = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type SuccessResponse<T> = {
  result: boolean;
  response: string;
  data: T;
}
export interface ErrorResponse {
  result: false;
  response: string;
  error: string;
  data?: null;
}
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse; 
export type BaseResponse<T> = Response<ApiResponse<T>>;
//#endregion

//#region INTERFACES
export interface IBaseQueryParams {
  page: number;
  limit: number;
  orderBy: OrderByType;
  sortBy: SortByType;
}
export interface IBaseGetAll<T> {
  count: number;
  pages: number;
  datas: T;
}
export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}
//#endregion