import { Request, Response, NextFunction } from 'express';

//#region TYPES
export type SortOrderType = 'asc' | 'desc';
export type SortByType = 'createdAt' | 'updatedAt';

export type ErrorHandlerType = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
//#endregion

//#region INTERFACES
export interface IBaseQueryParams {
  page: number;
  limit: number;
  sortOrder: SortOrderType;
  sortBy: SortByType;
}

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}
//#endregion