import { DocumentType } from '@/domain/entities/documentType.entity';
import { IBaseQueryParams } from './base.dto';

//#region TYPES
export type AvailableDocumentType = 'cpf' | 'cnpj';
export type DocumentTypeBodyDTO = Omit<DocumentTypeDTO, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>;
export type DocumentTypeUpdateDTO = Partial<DocumentTypeBodyDTO>;

export type DocumentTypeQueryParamsSortBy = Pick<IBaseQueryParams, 'sortBy'> & 'name';
export type DocumentTypeQueryParams = Partial<IBaseQueryParams> & {
  sortBy: DocumentTypeQueryParamsSortBy;
} 
//#endregion

//#region INTERFACES
export interface DocumentTypeDTO {
  id: string;
  name: AvailableDocumentType;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Date;
  updatedBy: Date;
}

export interface IDocumentsTypeRepository {
  find: (id: string) => Promise<DocumentType | undefined>;
  findAll: (params: DocumentTypeQueryParams) => Promise<DocumentType[] | undefined>;
  create: (body: DocumentTypeBodyDTO) => Promise<DocumentType | undefined>;
  update: (body: DocumentTypeUpdateDTO) => Promise<DocumentType | undefined>;
  delete: (id: string) => Promise<DocumentType | undefined>;
}
export interface IDocumentsTypeService extends IDocumentsTypeRepository {}
export interface IDocumentsTypeController extends IDocumentsTypeRepository {}
//#endregion