import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { ApplicationError } from '@/shared/errors/application.error';
import { env } from '@/infrastructure/config/environment';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new ApplicationError('Não autenticado', 401);
  
  const token = authHeader.split(' ')?.[1] ?? null;
  if (!token) throw new ApplicationError('Token inválido', 400);

  const decoded = jwt.verify(token, env.jwt.secret) as JwtPayload;
  req.user = {
    id: decoded.sub ?? '',
    email: decoded.email ?? '',
  }

  next();
}