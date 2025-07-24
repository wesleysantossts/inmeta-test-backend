import { User } from '@/domain/entities/user.entity';
import { IBaseGetAll, IBaseQueryParams } from './base.dto';

//#region TYPES
export type UserBodyDTO = Omit<UserDTO, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>;
export type UserUpdateDTO = Partial<UserBodyDTO>;

type AvailableQueryParamsOrderBy = 'name' | 'email';
export interface IUserQueryParams extends Partial<IBaseQueryParams> {
  orderBy?: AvailableQueryParamsOrderBy & IBaseQueryParams['orderBy'];
  filters?: {
    name?: string,
    email?: string,
  };
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
  findAll: (data: IUserQueryParams) => Promise<IBaseGetAll<User[]> | undefined>;
  create: (data: UserBodyDTO) => Promise<User | undefined>;
  // update: (body: UserUpdateDTO) => Promise<User | undefined>;
  // delete: (id: string) => Promise<User | undefined>;
}
export interface IUsersService extends IUsersRepository {}
export interface IUsersController extends IUsersRepository {}
//#endregion