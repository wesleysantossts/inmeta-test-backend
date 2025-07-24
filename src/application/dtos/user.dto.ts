import { User } from '@/domain/entities/user.entity';
import { IBaseQueryParams } from './base.dto';

//#region TYPES
export type UserBodyDTO = Omit<UserDTO, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>;
export type UserUpdateDTO = Partial<UserBodyDTO>;

export type UserQueryParamsSortBy = Pick<IBaseQueryParams, 'sortBy'> & 'name' | 'email';
export type UserQueryParams = Partial<IBaseQueryParams> & {
  sortBy: UserQueryParamsSortBy;
}
//#endregion

//#region INTERFACES
export interface UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: Date;
  updatedBy?: Date;
}

export interface IUsersRepository {
  find: (id: string) => Promise<User | undefined>;
  findAll: (params: UserQueryParams) => Promise<User[] | undefined>;
  create: (body: UserBodyDTO) => Promise<User | undefined>;
  update: (body: UserUpdateDTO) => Promise<User | undefined>;
  delete: (id: string) => Promise<User | undefined>;
}
export interface IUsersService extends IUsersRepository {}
export interface IUsersController extends IUsersRepository {}
//#endregion