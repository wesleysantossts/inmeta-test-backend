import { DocumentType } from '@/domain/entities/documentType.entity';
import { IBaseGetAll, IBaseQueryParams } from './base.dto';

//#region TYPES
export type AvailableDocumentType = 'cpf' | 'cnpj';
export type DocumentTypeBodyDTO = Omit<DocumentTypeDTO, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>;
export type DocumentTypeUpdateDTO = Partial<DocumentTypeBodyDTO> & { id: string };

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

export interface IDocumentTypesRepository {
  find: (id: string) => Promise<DocumentType | undefined>;
  findAll: (params: DocumentTypeQueryParams) => Promise<IBaseGetAll<DocumentType[]> | undefined>;
  create: (body: DocumentTypeBodyDTO) => Promise<DocumentType | undefined>;
  update: (body: DocumentTypeUpdateDTO) => Promise<DocumentType | undefined>;
  delete: (id: string) => Promise<void>;
}
export interface IDocumentsTypeService extends IDocumentTypesRepository {}
export interface IDocumentsTypeController extends IDocumentTypesRepository {}
//#endregion