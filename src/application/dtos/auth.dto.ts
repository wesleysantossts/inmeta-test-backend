import { User } from '@/domain/entities/user.entity';
import { BaseResponse } from './base.dto';
import { UserBodyDTO } from './user.dto';
import { Request } from 'express';

//#region TYPES
export type SignInParams = Omit<UserBodyDTO, 'name'>;
//#endregion

//#region INTERFACES
export interface IAuthResponse {
  user: Partial<User>;
  token: string;
} 
export interface IAuthService {
  signUp: (data: UserBodyDTO) => Promise<IAuthResponse>
  signIn: (data: SignInParams) => Promise<IAuthResponse>
}
export interface IAuthController {
  signUp: (req: Request, res: BaseResponse<IAuthResponse>) => Promise<void>;
  signIn: (req: Request, res: BaseResponse<IAuthResponse>) => Promise<void>;
}
//#endregion