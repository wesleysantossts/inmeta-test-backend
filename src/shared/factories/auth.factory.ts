import { AuthService } from '@/application/services/auth.service';
import { UsersRepository } from '@/infrastructure/repositories/users.repository';
import { AuthController } from '@/presentation/controllers/auth.controller';

export function AuthFactory() {
  const usersRepository = new UsersRepository();
  const service = new AuthService(
    usersRepository
  );
  const controller = new AuthController(service)
  
  return controller;
}