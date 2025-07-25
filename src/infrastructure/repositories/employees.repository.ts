import { PrismaClient } from '@prisma/client';

import { EmployeeBodyDTO, EmployeeQueryParams, EmployeeUpdateDTO, IEmployeesRepository } from '@/application/dtos/employee.dto';
import { Employee } from '@/domain/entities/employee.entity';
import { ApplicationError } from '@/shared/errors/application.error';

export class EmployeesRepository implements IEmployeesRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  private _instance(data: any): Employee {
    return new Employee({
      id: data.id ?? null,
      name: data.name ?? null,
      document: data.document ?? null,
      hiredAt: data.hiredAt ?? null,
      createdAt: data.createdAt ?? null,
      updatedAt: data.updatedAt ?? null,
      createdBy: data.createdBy ?? null,
      updatedBy: data.updatedBy ?? null
    });
  }

  async find(id: string) {
    const employee = await this.prisma.employee.findUnique({ where: { id }});
    if (!employee) return;

    return this._instance(employee);
  }

  async findAll(data: EmployeeQueryParams) {
    const {
      page = 1,
      limit: take = 10,
      orderBy = 'name',
      sortBy = 'asc',
      filters
    } = data;

    let where = null;
    if (filters) {
      const availableFilterFields = ['name','document'];
      const query = Object.keys(filters).map(key => {
        if (!availableFilterFields.includes(key)) throw new ApplicationError('Apenas os parâmetros name, document e hiredAt podem ser usados', 401);

        return { [key]: { contains: (filters as Record<string, any>)[key], mode: 'insensitive' }}
      })

      where = { OR: query };
    }

    const skip = (page! - 1) * take!;
    const employees = await this.prisma.employee.findMany({
      take,
      skip,
      orderBy: { [orderBy!]: sortBy },
      ...(where && { where })
    });
    const count = await this.prisma.employee.count({
      ...(where && { where })
    });

    const datas = employees.length > 0 ? employees.map(employee => this._instance(employee)) : [];
    const pages = Math.ceil(count / take!);
    
    const result = {
      count,
      pages,
      datas, 
    }
    return result; 
  }

  async create(data: EmployeeBodyDTO) {
    const result = await this.prisma.employee.create({ data });
    return this._instance(result);
  }

  async update(data: EmployeeUpdateDTO) {
    const foundEmployee = await this.find(data.id);
    if (!foundEmployee) throw new ApplicationError('Colaborador não encontrado pelo id', 404);

    const { id: idFoundEmployee, ...restFoundEmployee } = foundEmployee;
    const { id, ...rest } = data;
    const updatedEmployee = await this.prisma.employee.update({
      where: { id: id },
      data: {
        ...restFoundEmployee,
        ...rest
      }
    });

    return this._instance(updatedEmployee);
  }

  async delete(id: string) {
    const foundEmployee = await this.find(id);
    if (!foundEmployee) throw new ApplicationError('Colaborador não encontrado pelo id', 404);

    await this.prisma.employee.delete({ where: { id } });
  }
}