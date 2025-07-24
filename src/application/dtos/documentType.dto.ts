import { Request, Response } from 'express';

import { DocumentType } from '@/domain/entities/documentType.entity';
import { BaseResponse, IBaseGetAll, IBaseQueryParams } from './base.dto';

//#region TYPES
export type AvailableDocumentType = 'cpf' | 'cnpj';
export type DocumentTypeBodyDTO = Omit<DocumentTypeDTO, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>;
export type DocumentTypeUpdateDTO = Partial<DocumentTypeBodyDTO> & { id: string };
type AvailableQueryParamsOrderBy = 'name';
//#endregion

//#region INTERFACES
export interface DocumentTypeDTO {
  id: string;
  name: AvailableDocumentType;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
export type DocumentTypeQueryParamsSortBy = Pick<IBaseQueryParams, 'sortBy'> & 'name';
export type DocumentTypeQueryParams = Partial<IBaseQueryParams> & {
  orderBy?: IBaseQueryParams['orderBy'] & AvailableQueryParamsOrderBy;
  filters?: {
    name?: string,
  };
} 
export interface IDocumentTypesRepository {
  find: (id: string) => Promise<DocumentType | undefined>;
  findAll: (params: DocumentTypeQueryParams) => Promise<IBaseGetAll<DocumentType[]> | undefined>;
  create: (body: DocumentTypeBodyDTO) => Promise<DocumentType | undefined>;
  update: (body: DocumentTypeUpdateDTO) => Promise<DocumentType | undefined>;
  delete: (id: string) => Promise<void>;
}
export interface IDocumentTypeService extends Pick<IDocumentTypesRepository, 'create' | 'update'> {}
export interface IDocumentTypeController {
  create: (req: Request, res: BaseResponse<DocumentType | undefined>) => Promise<void>;
  update: (req: Request, res: BaseResponse<DocumentType | undefined>) => Promise<void>;
}
//#endregion