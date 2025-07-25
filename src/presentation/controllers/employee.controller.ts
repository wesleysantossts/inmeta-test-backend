import { Request, Response } from 'express';

import { BaseResponse, IBaseGetAll } from '@/application/dtos/base.dto';
import { ApplicationError } from '@/shared/errors/application.error';
import { IEmployeeController, IEmployeeService } from '@/application/dtos/employee.dto';
import { Employee } from '@/domain/entities/employee.entity';

export class EmployeeController implements IEmployeeController {
  constructor(
    private employeeService: IEmployeeService,
  ) {}

  async find(req: Request, res: BaseResponse<Employee | undefined>): Promise<void> {
    const { id } = req.params;
    if (!id) throw new ApplicationError('O id é obrigatório', 400);

    const data = await this.employeeService.find(id); 
    res.status(200).json({
      result: true,
      response: 'Colaborador encontrado com sucesso',
      data
    })
  }

  async findAll(req: Request, res: BaseResponse<IBaseGetAll<Employee[]>>): Promise<void> {
    const {
      limit = 10,
      page = 1,
      orderBy = 'createdAt',
      sortBy = 'asc',
      ...filters
    } = req.query;

    const availableOrderBy = ['name'];
    const availableFilters = ['name','document'];
    
    if (orderBy && !availableOrderBy.includes(String(orderBy))) 
      throw new ApplicationError(`Apenas o campo ${availableOrderBy.join(', ')} é permitido no orderBy`, 400);
    if (filters && Object.keys(filters).find(key => !availableFilters.includes(key)))
      throw new ApplicationError(`Apenas os filtro ${availableFilters.join(', ')} são permitidos`, 400);

    const data = await this.employeeService.findAll({
      ...req.query,
      page: Number(page),
      limit: Number(limit),
      ...(Object.keys(filters).length > 0 && { filters })
    }); 
    res.status(200).json({
      result: true,
      response: 'Colaboradores encontrados com sucesso',
      data
    })
  }

  async create(req: Request, res: BaseResponse<Employee>): Promise<void> {
    const { id: userId } = req.user!;
    const { name, document, hiredAt } = req.body;
    if (!name || !document || !hiredAt) throw new ApplicationError('Campos name, document e hiredAt são obrigatórios', 400);

    const data = await this.employeeService.create({
      ...req.body,
      createdBy: userId,
      updatedBy: userId,
    }); 
    res.status(201).json({
      result: true,
      response: 'Colaborador criado com sucesso',
      data
    })
  }

  async update(req: Request, res: BaseResponse<Employee>): Promise<void> {
    const { id } = req.params;
    const { name, document, hiredAt } = req.body;
    if (!name && !document && !hiredAt) throw new ApplicationError('Deve conter name, document ou hiredAt', 400);

    const data = await this.employeeService.update({ ...req.body, id }); 
    res.status(200).json({
      result: true,
      response: 'Colaborador atualizado com sucesso',
      data
    })
  }

  async delete(req: Request, res: BaseResponse<any>): Promise<void> {
    const { id } = req.params;
    if (!id) throw new ApplicationError('O id é obrigatório', 400);

    await this.employeeService.delete(id); 
    res.status(200).json({
      result: true,
      response: 'Colaborador removido com sucesso',
      data: null
    })
  }

  async linkDocumentTypes(req: Request, res: BaseResponse<any>): Promise<void> {
    const { id: userId } = req.user!;
    const { id } = req.params;
    const { documentTypeIds } = req.body;
    if (!id || !documentTypeIds) throw new ApplicationError('Campos id e documentTypeIds são obrigatórios', 400);

    if (!Array.isArray(documentTypeIds) || !documentTypeIds.length)
      throw new ApplicationError('O documentTypeIds deve ser uma lista de ids', 400);

    const now = new Date()
    await this.employeeService.linkDocumentTypes({
      ...req.body,
      id,
      createdAt: now,
      updatedAt: now,
      createdBy: userId,
      updatedBy: userId,
    }); 
    res.status(200).json({
      result: true,
      response: 'Colaborador vinculado aos tipos de documentos com sucesso',
      data: null
    })
  }
}