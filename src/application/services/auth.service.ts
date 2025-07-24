import { ApplicationError } from '@/shared/errors/application.error';
import { IAuthResponse, IAuthService, SignInParams } from '../dtos/auth.dto';
import { IUsersRepository, UserBodyDTO } from '../dtos/user.dto';
import { EncryptUtils } from '@/shared/utils/encrypt.util';
import { env } from '@/infrastructure/config/environment';
import jwt from 'jsonwebtoken';
import { User } from '@/domain/entities/user.entity';

export class AuthService implements IAuthService {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async signUp(data: UserBodyDTO): Promise<IAuthResponse> {
    const userExists = await this.usersRepository.findAll({ filters: { email: data.email } });
    if (userExists && userExists.datas.length > 0) throw new ApplicationError('Já existe um usuário cadastrado com esse email', 409);
    
    const password = await EncryptUtils.generateHash(data.password);
    const createdUser = await this.usersRepository.create({ ...data, password: String(password) });
    if (!createdUser) throw new ApplicationError('Não foi possível criar o usuário');
    
    const token = this.generateToken(createdUser);

    const result = {
      user: createdUser,
      token
    };
    return result;
  }

  async signIn(data: SignInParams): Promise<IAuthResponse> {
    const foundUser = await this.usersRepository.findAll({ filters: { email: data.email } });
    if (!foundUser) throw new ApplicationError('Usuário não encontrado pelo e-mail', 404);
    
    const user = foundUser.datas[0];
    const passwordIsCorrect = await EncryptUtils.comparePassword(data.password, user.password);
    if (!passwordIsCorrect) throw new ApplicationError('Senha não confere', 401);
    
    const token = this.generateToken(user);
    const { password, ...restUser } = user;

    const result = {
      user: restUser,
      token
    };
    return result;
  }

  private generateToken(user: User) {
    const { secret, expiresIn } = env.jwt;
    const { id, email } = user;

    const payload = { sub: id, email };
    const token = jwt.sign(payload, secret, { expiresIn: expiresIn as any });

    return token;
  }
}