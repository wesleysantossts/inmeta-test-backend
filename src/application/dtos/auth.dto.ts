import { User } from '@/domain/entities/user.entity';
import { BaseResponse, IBaseQueryParams } from './base.dto';
import { UserBodyDTO } from './user.dto';
import { Request, Response } from 'express';

//#region TYPES
export type SignInParams = Omit<UserBodyDTO, 'name'>;
//#endregion

//#region INTERFACES
export interface IAuthResponse {
  user: User;
  token: string;
} 
export interface IAuthService {
  signUp: (params: UserBodyDTO) => Promise<IAuthResponse>
  // signIn: (params: SignInParams) => Promise<IAuthResponse>
}
export interface IAuthController {
  signUp: (req: Request, res: BaseResponse<IAuthResponse>) => Promise<void>;
  // signIn: (req: Request, res: BaseResponse<IAuthResponse>) => Promise<void>;
}
//#endregion