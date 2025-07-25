import { Request } from 'express';

import { BaseResponse, IBaseGetAll } from '@/application/dtos/base.dto';
import { ApplicationError } from '@/shared/errors/application.error';
import { Document } from '@/domain/entities/document.entity';
import { DocumentStatus, IDocumentsController, IDocumentsService } from '@/application/dtos/document.dto';

export class DocumentsController implements IDocumentsController {
  constructor(
    private documentService: IDocumentsService,
  ) {}

  async find(req: Request, res: BaseResponse<Document | undefined>): Promise<void> {
    const { id } = req.params;
    if (!id) throw new ApplicationError('O id é obrigatório', 400);

    const data = await this.documentService.find(id); 
    res.status(200).json({
      result: true,
      response: 'Documento encontrado com sucesso',
      data
    })
  }

  async findAll(req: Request, res: BaseResponse<IBaseGetAll<Document[]>>): Promise<void> {
    const {
      limit = 10,
      page = 1,
      orderBy = 'name',
      sortBy = 'asc',
      ...filters
    } = req.query;

    const availableOrderBy = ['name','status'];
    const availableFilters = ['name','status','employeeId','documentTypeId'];
    
    if (orderBy && !availableOrderBy.includes(String(orderBy))) 
      throw new ApplicationError(`Apenas os campos ${availableOrderBy.join(', ')} são permitidos no orderBy`, 400);
    if (filters && Object.keys(filters).find(key => !availableFilters.includes(key)))
      throw new ApplicationError(`Apenas os filtros ${availableFilters.join(', ')} são permitidos`, 400);

    const data = await this.documentService.findAll({
      ...req.query,
      page: Number(page),
      limit: Number(limit),
      ...(Object.keys(filters).length > 0 && { filters })
    }); 
    res.status(200).json({
      result: true,
      response: 'Documentos encontrados com sucesso',
      data
    })
  }

  async create(req: Request, res: BaseResponse<Document>): Promise<void> {
    const { id: userId } = req.user!;
    const { name, status, employeeId, documentTypeId } = req.body;
    if (!name || !status || !employeeId || !documentTypeId) 
      throw new ApplicationError('Campos name, status, employeeId e documentTypeId são obrigatório', 400);
    if (!this.isValidStatus(status)) throw new ApplicationError('Status inválido', 400);
    
    const data = await this.documentService.create({
      ...req.body,
      createdBy: userId,
      updatedBy: userId,
    }); 
    res.status(200).json({
      result: true,
      response: 'Documento criado com sucesso',
      data
    })
  }

  async update(req: Request, res: BaseResponse<Document>): Promise<void> {
    const { id } = req.params;
    const { name, status, employeeId, documentTypeId } = req.body;
    if (!name && !status && !employeeId && !documentTypeId)
      throw new ApplicationError('Deve conter ao menos um dos campos name, status, employeeId ou documentTypeId', 400);
    if (!this.isValidStatus(status)) throw new ApplicationError('Status inválido', 400);

    const data = await this.documentService.update({ ...req.body, id }); 
    res.status(200).json({
      result: true,
      response: 'Documento atualizado com sucesso',
      data
    })
  }

  async delete(req: Request, res: BaseResponse<any>): Promise<void> {
    const { id } = req.params;
    if (!id) throw new ApplicationError('O campo id é obrigatório', 400);

    await this.documentService.delete(id); 
    res.status(200).json({
      result: true,
      response: 'Documento removido com sucesso',
      data: null
    })
  }

  async pendingDocuments(req: Request, res: BaseResponse<IBaseGetAll<Document[]>>): Promise<void> {
    const {
      limit = 10,
      page = 1,
      orderBy = 'createdAt',
      sortBy = 'asc',
      ...filters
    } = req.query;

    const availableOrderBy = ['name'];
    const availableFilters = ['employeeId','documentTypeId'];
    
    if (orderBy && !availableOrderBy.includes(String(orderBy))) 
      throw new ApplicationError(`Apenas os campos ${availableOrderBy.join(', ')} são permitidos no orderBy`, 400);
    if (filters && Object.keys(filters).find(key => !availableFilters.includes(key)))
      throw new ApplicationError(`Apenas os filtros ${availableFilters.join(', ')} são permitidos`, 400);

    const data = await this.documentService.findAll({
      ...req.query,
      page: Number(page),
      limit: Number(limit),
      filters: {
        ...(Object.keys(filters).length > 0 && filters),
        status: 'PENDENTE',
      },
      include: { employee: true, documentType: true }
    }); 
    res.status(200).json({
      result: true,
      response: 'Documentos encontrados com sucesso',
      data
    })
  }

  private isValidStatus(status: string): status is DocumentStatus {
    const validStatus: DocumentStatus[] = ['PENDENTE','ENVIADO','REJEITADO','APROVADO'];
    return validStatus.includes(status as DocumentStatus);
  }
}