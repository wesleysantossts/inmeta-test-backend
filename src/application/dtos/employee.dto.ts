import { Employee } from '@/domain/entities/employee.entity';
import { BaseResponse, IBaseGetAll, IBaseQueryParams } from './base.dto';
import { Request } from 'express';

//#region TYPES
export type EmployeeBodyDTO = Omit<EmployeeDTO, 'id' | 'createdAt' | 'updatedAt'>;
export type EmployeeUpdateDTO = Partial<EmployeeBodyDTO> & { id: string };
type AvailableQueryParamsOrderBy = 'name' | 'email';

export type EmployeeLinkDocumentTypesParams = Pick<Employee, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'> & {
  documentTypeIds: string[];
}
export type EmployeeUnlinkDocumentTypesParams = {
  /** id do colaborador */
  id: string;
  documentTypeIds: string[];
}
//#endregion

//#region INTERFACES
export interface EmployeeDTO {
  id: string;
  name: string;
  document: string;
  hiredAt: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}
export interface EmployeeQueryParams extends Partial<IBaseQueryParams> {
  orderBy?: IBaseQueryParams['orderBy'] & AvailableQueryParamsOrderBy;
  filters?: {
    name?: string,
    document?: string,
  };
}
export interface IEmployeesRepository {
  find: (id: string) => Promise<Employee | undefined>;
  findAll: (data: EmployeeQueryParams) => Promise<IBaseGetAll<Employee[]>>;
  create: (data: EmployeeBodyDTO) => Promise<Employee>;
  update: (data: EmployeeUpdateDTO) => Promise<Employee>;
  delete: (id: string) => Promise<void>;
  linkDocumentTypes: (id: Omit<Document, 'id'>) => Promise<void>;
  unlinkDocumentTypes: (data: EmployeeUnlinkDocumentTypesParams) => Promise<void>;
}
export interface IEmployeeService extends Omit<IEmployeesRepository, 'linkDocumentTypes'> {
  linkDocumentTypes: (data: EmployeeLinkDocumentTypesParams) => Promise<void>;
}
export interface IEmployeeController {
  find: (req: Request, res: BaseResponse<Employee | undefined>) => Promise<void>;
  findAll: (req: Request, res: BaseResponse<IBaseGetAll<Employee[]>>) => Promise<void>;
  create: (req: Request, res: BaseResponse<Employee>) => Promise<void>;
  update: (req: Request, res: BaseResponse<Employee>) => Promise<void>;
  delete: (req: Request, res: BaseResponse<any>) => Promise<void>;
  linkDocumentTypes: (req: Request, res: BaseResponse<any>) => Promise<void>;
}
//#endregion