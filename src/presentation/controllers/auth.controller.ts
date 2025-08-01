import { Request } from 'express';

import { IAuthController, IAuthResponse, IAuthService } from '@/application/dtos/auth.dto';
import { BaseResponse } from '@/application/dtos/base.dto';
import { ApplicationError } from '@/shared/errors/application.error';

export class AuthController implements IAuthController {
  constructor(
    private authService: IAuthService,
  ) {}

  async signUp(req: Request, res: BaseResponse<IAuthResponse>): Promise<void> {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw new ApplicationError('Campos name, email e password são obrigatórios', 400);

    const data = await this.authService.signUp(req.body); 
    res.status(201).json({
      result: true,
      response: 'Usuário cadastrado com sucesso',
      data
    })
  }
  
  async signIn(req: Request, res: BaseResponse<IAuthResponse>): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) throw new ApplicationError('Campos email e password são obrigatórios', 400);

    const data = await this.authService.signIn(req.body); 
    res.status(200).json({
      result: true,
      response: 'Usuário logado com sucesso',
      data
    })
  }
}