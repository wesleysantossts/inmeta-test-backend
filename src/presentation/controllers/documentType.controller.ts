import { Request, Response } from 'express';

import { BaseResponse } from '@/application/dtos/base.dto';
import { ApplicationError } from '@/shared/errors/application.error';
import { IDocumentTypeController, IDocumentTypeService } from '@/application/dtos/documentType.dto';
import { DocumentType } from '@/domain/entities/documentType.entity';

export class DocumentTypeController implements IDocumentTypeController {
  constructor(
    private documentTypeService: IDocumentTypeService,
  ) {}

  async create(req: Request, res: BaseResponse<DocumentType | undefined>): Promise<void> {
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

  async update(req: Request, res: BaseResponse<DocumentType | undefined>): Promise<void> {
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
}