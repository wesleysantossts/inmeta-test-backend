import { Request, Response } from 'express';

import { BaseResponse, IBaseGetAll } from '@/application/dtos/base.dto';
import { ApplicationError } from '@/shared/errors/application.error';
import { IDocumentTypeController, IDocumentTypeService } from '@/application/dtos/documentType.dto';
import { DocumentType } from '@/domain/entities/documentType.entity';

export class DocumentTypeController implements IDocumentTypeController {
  constructor(
    private documentTypeService: IDocumentTypeService,
  ) {}

  async find(req: Request, res: BaseResponse<DocumentType | undefined>): Promise<void> {
    const { id } = req.params;
    if (!id) throw new ApplicationError('O id é obrigatório', 400);

    const data = await this.documentTypeService.find(id); 
    res.status(200).json({
      result: true,
      response: 'Tipo de documento encontrado com sucesso',
      data
    })
  }

  async findAll(req: Request, res: BaseResponse<IBaseGetAll<DocumentType[]>>): Promise<void> {
    const {
      limit = 10,
      page = 1,
      orderBy = 'createdAt',
      sortBy = 'asc',
      ...filters
    } = req.query;

    const availableOrderBy = ['name'];
    const availableFilters = ['name'];
    
    if (orderBy && !availableOrderBy.includes(String(orderBy))) 
      throw new ApplicationError(`Apenas o campo ${availableOrderBy.join(', ')} é permitido no orderBy`, 400);
    if (filters && Object.keys(filters).find(key => !availableFilters.includes(key)))
      throw new ApplicationError(`Apenas o filtro ${availableFilters.join(', ')} é permitidos`, 400);

    const data = await this.documentTypeService.findAll({
      ...req.query,
      page: Number(page),
      limit: Number(limit),
      ...(filters && { filters })
    }); 
    res.status(200).json({
      result: true,
      response: 'Tipos de documentos encontrados com sucesso',
      data
    })
  }

  async create(req: Request, res: BaseResponse<DocumentType>): Promise<void> {
    const { id: userId } = req.user!;
    const { name } = req.body;
    if (!name) throw new ApplicationError('Campo name é obrigatório', 400);

    const data = await this.documentTypeService.create({
      ...req.body,
      createdBy: userId,
      updatedBy: userId,
    }); 
    res.status(201).json({
      result: true,
      response: 'Tipo de documento criado com sucesso',
      data
    })
  }

  async update(req: Request, res: BaseResponse<DocumentType>): Promise<void> {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) throw new ApplicationError('Deve conter o campo name', 400);

    const data = await this.documentTypeService.update({ ...req.body, id }); 
    res.status(200).json({
      result: true,
      response: 'Tipo de documento atualizado com sucesso',
      data
    })
  }

  async delete(req: Request, res: BaseResponse<any>): Promise<void> {
    const { id } = req.params;
    if (!id) throw new ApplicationError('O campo id é obrigatório', 400);

    await this.documentTypeService.delete(id); 
    res.status(200).json({
      result: true,
      response: 'Tipo de documento removido com sucesso',
      data: null
    })
  }
}