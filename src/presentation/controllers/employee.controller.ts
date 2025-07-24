import { Request, Response } from 'express';

import { BaseResponse } from '@/application/dtos/base.dto';
import { ApplicationError } from '@/shared/errors/application.error';
import { IEmployeeController, IEmployeeService } from '@/application/dtos/employee.dto';
import { Employee } from '@/domain/entities/employee.entity';

export class EmployeeController implements IEmployeeController {
  constructor(
    private employeeService: IEmployeeService,
  ) {}

  async create(req: Request, res: BaseResponse<Employee | undefined>): Promise<void> {
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

  async update(req: Request, res: BaseResponse<Employee | undefined>): Promise<void> {
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
}