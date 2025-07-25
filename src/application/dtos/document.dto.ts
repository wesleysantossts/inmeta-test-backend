import { Request, Response } from 'express';

import { Document } from '@/domain/entities/document.entity';
import { BaseResponse, IBaseGetAll, IBaseQueryParams } from './base.dto';

//#region TYPES
export type DocumentStatus = 'ENVIADO' | 'PENDENTE' | 'APROVADO' | 'REJEITADO';
export type DocumentBodyDTO = Omit<DocumentDTO, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>;
export type DocumentUpdateDTO = Partial<DocumentBodyDTO> & { id: string };
type AvailableQueryParamsOrderBy = 'name' | 'status';

export type DocumentQueryParamsSortBy = Pick<IBaseQueryParams, 'sortBy'> & 'name';
export type DocumentQueryParams = Partial<IBaseQueryParams> & {
  orderBy?: IBaseQueryParams['orderBy'] & AvailableQueryParamsOrderBy;
  filters?: {
    name?: string,
    status?: string,
    employeeId?: string,
    documentTypeId?: string,
  };
} 
//#endregion

//#region INTERFACES
export interface DocumentDTO {
  id: string;
  name: string;
  status: DocumentStatus;
  employeeId: string;
  documentTypeId: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface IDocumentsRepository {
  find: (id: string) => Promise<Document | undefined>;
  findAll: (params: DocumentQueryParams) => Promise<IBaseGetAll<Document[]>>;
  create: (body: DocumentBodyDTO) => Promise<Document>;
  update: (body: DocumentUpdateDTO) => Promise<Document>;
  delete: (id: string) => Promise<void>;
}
export interface IDocumentsService extends IDocumentsRepository {}
export interface IDocumentsController {
  find: (req: Request, res: BaseResponse<Document | undefined>) => Promise<void>;
  findAll: (req: Request, res: BaseResponse<IBaseGetAll<Document[]>>) => Promise<void>;
  create: (req: Request, res: BaseResponse<Document>) => Promise<void>;
  update: (req: Request, res: BaseResponse<Document>) => Promise<void>;
  delete: (req: Request, res: BaseResponse<any>) => Promise<void>;
}
//#endregion