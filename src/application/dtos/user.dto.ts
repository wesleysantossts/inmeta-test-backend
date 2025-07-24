import { User } from '@/domain/entities/user.entity';
import { IBaseGetAll, IBaseQueryParams } from './base.dto';

//#region TYPES
export type UserBodyDTO = Omit<UserDTO, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>;
export type UserUpdateDTO = Partial<UserBodyDTO> & { id: string };
type AvailableQueryParamsOrderBy = 'name' | 'email';
//#endregion

//#region INTERFACES
export interface UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}
export interface IUserQueryParams extends Partial<IBaseQueryParams> {
  orderBy?: AvailableQueryParamsOrderBy & IBaseQueryParams['orderBy'];
  filters?: {
    name?: string,
    email?: string,
  };
}
export interface IUsersRepository {
  find: (id: string) => Promise<User | undefined>;
  findAll: (data: IUserQueryParams) => Promise<IBaseGetAll<User[]> | undefined>;
  create: (data: UserBodyDTO) => Promise<User | undefined>;
  update: (data: UserUpdateDTO) => Promise<User | undefined>;
  delete: (id: string) => Promise<void>;
}
export interface IUsersService extends IUsersRepository {}
export interface IUsersController extends IUsersRepository {}
//#endregion