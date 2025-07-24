import { User } from '@/domain/entities/user.entity';
import { IBaseQueryParams } from './base.dto';
import { UserBodyDTO } from './user.dto';

//#region TYPES
export type SignInParams = Omit<UserBodyDTO, 'name'>;
//#endregion

//#region INTERFACES
export interface IAuthResponse {
  user: User;
  token: string;
} 
export interface IAuthService {
  signUp: (params: UserBodyDTO) => Promise<IAuthResponse | undefined>
  signIn: (params: SignInParams) => Promise<IAuthResponse | undefined>
}
export interface IAuthController extends IAuthService {}
//#endregion