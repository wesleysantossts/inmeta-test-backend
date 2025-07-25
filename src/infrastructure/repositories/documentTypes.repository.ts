import { PrismaClient } from '@prisma/client';

import { DocumentTypeBodyDTO, DocumentTypeQueryParams, DocumentTypeUpdateDTO, IDocumentTypesRepository } from '@/application/dtos/documentType.dto';
import { DocumentType } from '@/domain/entities/documentType.entity';
import { ApplicationError } from '@/shared/errors/application.error';

export class DocumentTypesRepository implements IDocumentTypesRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  private _instance(data: any): DocumentType {
    return new DocumentType({
      id: data.id ?? null,
      name: data.name ?? null,
      createdAt: data.createdAt ?? null,
      updatedAt: data.updatedAt ?? null,
      createdBy: data.createdBy ?? null,
      updatedBy: data.updatedBy ?? null
    });
  }

  async find(id: string): Promise<DocumentType | undefined> {
    const documentType = await this.prisma.documentType.findUnique({ where: { id }});
    if (!documentType) return;

    return this._instance(documentType);
  }

  async findAll(data: DocumentTypeQueryParams) {
    const {
      page = 1,
      limit: take = 5,
      orderBy = 'createdAt',
      sortBy = 'asc',
      filters
    } = data;

    let where = null;
    if (filters) {
      const availableFilterFields = ['name'];
      const query = Object.keys(filters).map(key => {
        if (!availableFilterFields.includes(key)) throw new ApplicationError('Apenas o parâmetro name pode ser usado', 401);

        return { [key]: { contains: (filters as Record<string, any>)[key], mode: 'insensitive' }}
      })

      where = { OR: query };
    }

    const skip = (page - 1) * take;
    const documentTypes = await this.prisma.documentType.findMany({
      take,
      skip,
      orderBy: { [orderBy]: sortBy },
      ...(where && { where })
    });
    const count = await this.prisma.documentType.count({
      ...(where && { where })
    });

    const datas = documentTypes.length > 0 ? 
      documentTypes.map(documentType => this._instance(documentType)) 
      : [];
    const pages = Math.ceil(count / take!)

    const result = {
      count,
      pages,
      datas, 
    }
    return result; 
  }

  async create(data: DocumentTypeBodyDTO) {
    const result = await this.prisma.documentType.create({ data });
    return this._instance(result);
  }

  async update(data: DocumentTypeUpdateDTO) {
    const foundDocumentType = await this.find(data.id);
    if (!foundDocumentType) throw new ApplicationError('Tipo de documento não encontrado pelo id', 404);

    const { id: idFoundEmployee, ...restFoundDocumentType } = foundDocumentType;
    const { id, ...rest } = data;
    const updatedDocumentType = await this.prisma.documentType.update({
      where: { id: id },
      data: {
        ...restFoundDocumentType,
        ...rest
      }
    });

    return this._instance(updatedDocumentType);
  }

  async delete(id: string) {
    const foundDocumentType = await this.find(id);
    if (!foundDocumentType) throw new ApplicationError('Tipo de documento não encontrado pelo id', 404);

    await this.prisma.documentType.delete({ where: { id } });
  }
}