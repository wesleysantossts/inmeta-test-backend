import { PrismaClient } from '@prisma/client';

import { IUserQueryParams, IUsersRepository, UserBodyDTO, UserUpdateDTO } from '@/application/dtos/user.dto';
import { User } from '@/domain/entities/user.entity';
import { ApplicationError } from '@/shared/errors/application.error';

export class UsersRepository implements IUsersRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  private _instance(data: any): User {
    return new User({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy
    });
  }

  async find(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, omit: { password: true } });
    if (!user) return;

    return this._instance(user);
  }

  async findAll(data: IUserQueryParams) {
    const {
      page = 1,
      limit: take = 5,
      orderBy = 'createdAt',
      sortBy = 'asc',
      filters
    } = data;

    let where = null;
    if (filters) {
      const availableFilterFields = ['name','email'];
      const query = Object.keys(filters).map(key => {
        if (!availableFilterFields.includes(key)) throw new ApplicationError('Apenas os parâmetros name e email podem ser usados', 401);

        return { [key]: { contains: (filters as Record<string, any>)[key], mode: 'insensitive' }}
      })

      where = { OR: query };
    }

    const skip = (page - 1) * take;
    const users = await this.prisma.user.findMany({
      take,
      skip,
      orderBy: { [orderBy]: sortBy },
      ...(where && { where })
    });
    const count = await this.prisma.user.count({
      ...(where && { where })
    });

    const datas = users.length > 0 ? users.map(user => this._instance(user)) : [];
    const pages = Math.ceil(count / take!);

    const result = {
      count,
      pages,
      datas, 
    }
    return result; 
  }

  async create(data: UserBodyDTO) {
    const result = await this.prisma.user.create({ data, omit: { password: true } });
    return this._instance(result);
  }
  
  async update(data: UserUpdateDTO) {
    const foundUser = await this.find(data.id);
    if (!foundUser) throw new ApplicationError('Usuário não encontrado pelo id', 404);

    const { id: idFoundUser, ...restFoundUser } = foundUser;
    const { id, ...rest } = data;
    const updatedUser = await this.prisma.user.update({
      where: { id: id },
      data: {
        ...foundUser,
        ...rest
      }
    });

    return this._instance(updatedUser);
  }

  async delete(id: string) {
    const user = await this.find(id);
    if (!user) throw new ApplicationError('Usuário não encontrado pelo id', 404);

    await this.prisma.user.delete({ where: { id } });
  }
}