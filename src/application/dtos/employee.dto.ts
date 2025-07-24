import { Employee } from '@/domain/entities/employee.entity';
import { BaseResponse, IBaseGetAll, IBaseQueryParams } from './base.dto';
import { Request } from 'express';

//#region TYPES
export type EmployeeBodyDTO = Omit<EmployeeDTO, 'id' | 'createdAt' | 'updatedAt'>;
export type EmployeeUpdateDTO = Partial<EmployeeBodyDTO> & { id: string };
type AvailableQueryParamsOrderBy = 'name' | 'email';
//#endregion

//#region INTERFACES
export interface EmployeeDTO {
  id: string;
  name: string;
  document: string;
  hiredAt: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: Date;
  updatedBy?: Date;
}
export interface EmployeeQueryParams extends Partial<IBaseQueryParams> {
  orderBy?: IBaseQueryParams['orderBy'] & AvailableQueryParamsOrderBy;
  filters?: {
    name?: string,
    document?: string,
    hiredAt?: string,
  };
}
export interface IEmployeesRepository {
  find: (id: string) => Promise<Employee | undefined>;
  findAll: (data: EmployeeQueryParams) => Promise<IBaseGetAll<Employee[]> | undefined>;
  create: (data: EmployeeBodyDTO) => Promise<Employee | undefined>;
  update: (data: EmployeeUpdateDTO) => Promise<Employee | undefined>;
  delete: (id: string) => Promise<void>;
}
export interface IEmployeeService extends Pick<IEmployeesRepository, 'create' | 'update'> {}
export interface IEmployeeController {
  create: (req: Request, res: BaseResponse<Employee | undefined>) => Promise<void>;
  update: (req: Request, res: BaseResponse<Employee | undefined>) => Promise<void>;
}
//#endregion