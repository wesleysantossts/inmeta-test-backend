import { Employee } from '@/domain/entities/employee.entity';
import { IBaseGetAll, IBaseQueryParams } from './base.dto';

//#region TYPES
export type EmployeeBodyDTO = Omit<EmployeeDTO, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>;
export type EmployeeUpdateDTO = Partial<EmployeeBodyDTO> & { id: string };

export type EmployeeQueryParamsSortBy = Pick<IBaseQueryParams, 'sortBy'> & 'name' | 'document' | 'hiredAt';
export type EmployeeQueryParams = Partial<IBaseQueryParams> & {
  sortBy: EmployeeQueryParamsSortBy;
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
  createdBy?: Date;
  updatedBy?: Date;
}

export interface IEmployeesRepository {
  find: (id: string) => Promise<Employee | undefined>;
  findAll: (data: EmployeeQueryParams) => Promise<IBaseGetAll<Employee[]> | undefined>;
  create: (body: EmployeeBodyDTO) => Promise<Employee | undefined>;
  update: (body: EmployeeUpdateDTO) => Promise<Employee | undefined>;
  // delete: (id: string) => Promise<Employee | undefined>;
}
export interface IEmployeeService extends IEmployeesRepository {}
export interface IEmployeeController extends IEmployeesRepository {}
//#endregion