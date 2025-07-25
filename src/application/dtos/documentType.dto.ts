import { Request } from 'express';

import { DocumentType } from '@/domain/entities/documentType.entity';
import { BaseResponse, IBaseGetAll, IBaseQueryParams } from './base.dto';

//#region TYPES
export type AvailableDocumentType = 'cpf' | 'cnpj';
export type DocumentTypeBodyDTO = Omit<DocumentTypeDTO, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>;
export type DocumentTypeUpdateDTO = Partial<DocumentTypeBodyDTO> & { id: string };
type AvailableQueryParamsOrderBy = 'name';

export type DocumentTypeQueryParamsSortBy = Pick<IBaseQueryParams, 'sortBy'> & 'name';
export type DocumentTypeQueryParams = Partial<IBaseQueryParams> & {
  orderBy?: IBaseQueryParams['orderBy'] & AvailableQueryParamsOrderBy;
  filters?: {
    name?: string,
  };
}
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

export interface IDocumentTypesRepository {
  find: (id: string) => Promise<DocumentType | undefined>;
  findAll: (params: DocumentTypeQueryParams) => Promise<IBaseGetAll<DocumentType[]>>;
  create: (body: DocumentTypeBodyDTO) => Promise<DocumentType>;
  update: (body: DocumentTypeUpdateDTO) => Promise<DocumentType>;
  delete: (id: string) => Promise<void>;
}
export interface IDocumentTypeService extends IDocumentTypesRepository {}
export interface IDocumentTypeController {
  find: (req: Request, res: BaseResponse<DocumentType | undefined>) => Promise<void>;
  findAll: (req: Request, res: BaseResponse<IBaseGetAll<DocumentType[]>>) => Promise<void>;
  create: (req: Request, res: BaseResponse<DocumentType>) => Promise<void>;
  update: (req: Request, res: BaseResponse<DocumentType>) => Promise<void>;
  delete: (req: Request, res: BaseResponse<any>) => Promise<void>;
}
//#endregion