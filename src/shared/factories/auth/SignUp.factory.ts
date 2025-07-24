import { AuthService } from '@/application/services/auth.service';
import { UsersRepository } from '@/infrastructure/repositories/users.repository';
import { AuthController } from '@/presentation/controllers/auth.controller';
import { Request, Response } from 'express';

export function SignUpFactory() {
  const usersRepository = new UsersRepository();
  const service = new AuthService(
    usersRepository
  );
  const controller = new AuthController(service)
  
  return controller;
}