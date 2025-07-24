import { Document } from '@/domain/entities/document.entity';
import { IBaseQueryParams } from './base.dto';

//#region TYPES
export type DocumentStatus = 'ENVIADO' | 'PENDENTE';
export type DocumentBodyDTO = Omit<DocumentDTO, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>;
export type DocumentUpdateDTO = Partial<DocumentBodyDTO>;

export type DocumentQueryParamsSortBy = Pick<IBaseQueryParams, 'sortBy'> & 'name';
export type DocumentQueryParams = Partial<IBaseQueryParams> & {
  sortBy: DocumentQueryParamsSortBy;
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
  createdBy: Date;
  updatedBy: Date;
}

export interface IDocumentsRepository {
  find: (id: string) => Promise<Document | undefined>;
  findAll: (params: DocumentQueryParams) => Promise<Document[] | undefined>;
  create: (body: DocumentBodyDTO) => Promise<Document | undefined>;
  update: (body: DocumentUpdateDTO) => Promise<Document | undefined>;
  delete: (id: string) => Promise<Document | undefined>;
}
export interface IDocumentsService extends IDocumentsRepository {}
export interface IDocumentsController extends IDocumentsRepository {}
//#endregion