import { IUserQueryParams, IUsersRepository, UserBodyDTO } from '@/application/dtos/user.dto';
import { User } from '@/domain/entities/user.entity';
import { ApplicationError } from '@/shared/errors/application.error';
import { PrismaClient } from '@prisma/client';

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

  async findAll(params: IUserQueryParams) {
    const {
      page = 1,
      limit: take = 5,
      orderBy = 'createdAt',
      sortBy = 'asc',
      filters
    } = params;

    let where = null;
    if (filters) {
      where = {
        OR: Object.keys(filters).map(key => ({ [key]: { contains: (filters as Record<string, any>)[key], mode: 'insensitive' } }))
      }
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
    if (!count) return;

    const datas = users.map(user => this._instance(user));
    const result = {
      count,
      pages: count / take,
      datas, 
    }

    return result; 
  }

  async create(data: UserBodyDTO) {
    const result = await this.prisma.user.create({ data, omit: { password: true } });
    return this._instance(result);
  }
}