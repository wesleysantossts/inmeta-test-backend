import { ApplicationError } from '@/shared/errors/application.error';
import { IAuthResponse, IAuthService, SignInParams } from '../dtos/auth.dto';
import { IUsersRepository, UserBodyDTO } from '../dtos/user.dto';
import { EncryptUtils } from '@/shared/utils/encrypt.util';
import { env } from '@/infrastructure/config/environment';
import jwt from 'jsonwebtoken';
import { User } from '@/domain/entities/user.entity';
import { EmployeeBodyDTO, EmployeeQueryParams, EmployeeUpdateDTO, IEmployeeService, IEmployeesRepository } from '../dtos/employee.dto';
import { Employee } from '@/domain/entities/employee.entity';
import { IBaseGetAll } from '../dtos/base.dto';

export class EmployeeService implements IEmployeeService {
  constructor(
    private employeesRepository: IEmployeesRepository,
  ) {}

  async find(id: string): Promise<Employee> {
    const foundEmployee = await this.employeesRepository.find(id);
    if (!foundEmployee) throw new ApplicationError('Colaborador não encontrado pelo id', 404);
    
    const result = foundEmployee;
    return result;
  }
  
  async findAll(params: EmployeeQueryParams): Promise<IBaseGetAll<Employee[]>> {
    const result = await this.employeesRepository.findAll(params);
    return result;
  }

  async create(data: EmployeeBodyDTO): Promise<Employee> {
    const employeeExists = await this.employeesRepository.findAll({ filters: { document: data.document } });
    if (employeeExists && employeeExists.datas.length > 0) throw new ApplicationError('Colaborador já cadastrado', 409);
    
    const createdEmployee = await this.employeesRepository.create(data);
    if (!createdEmployee) throw new ApplicationError('Não foi possível criar o colaborador');
    
    const result = createdEmployee;
    return result;
  }

  async update(data: EmployeeUpdateDTO): Promise<Employee> {
    const employeeExists = await this.employeesRepository.find(data.id);
    if (!employeeExists) throw new ApplicationError('Colaborador não encontrado pelo id', 404);
    
    const updatedEmployee = await this.employeesRepository.update(data);
    if (!updatedEmployee) throw new ApplicationError('Não foi possível atualizar o colaborador');
    
    const result = updatedEmployee;
    return result;
  }

  async delete(id: string): Promise<void> {
    const documentExists = await this.employeesRepository.find(id);
    if (!documentExists) throw new ApplicationError('Colaborador não encontrado pelo id', 404);
    
    await this.employeesRepository.delete(id);
  }
}