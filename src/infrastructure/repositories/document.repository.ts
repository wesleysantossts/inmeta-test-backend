import { DocumentBodyDTO, DocumentQueryParams, DocumentUpdateDTO, IDocumentsRepository } from '@/application/dtos/document.dto';
import { Document } from '@/domain/entities/document.entity';
import { ApplicationError } from '@/shared/errors/application.error';
import { PrismaClient } from '@prisma/client';

export class DocumentsRepository implements IDocumentsRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  private _instance(data: any): Document {
    return new Document({
      id: data.id ?? null,
      name: data.name ?? null,
      employeeId: data.employeeId ?? null,
      documentTypeId: data.documentTypeId ?? null,
      status: data.status ?? null,
      createdAt: data.createdAt ?? null,
      updatedAt: data.updatedAt ?? null,
      createdBy: data.createdBy ?? null,
      updatedBy: data.updatedBy ?? null
    });
  }

  async find(id: string) {
    const document = await this.prisma.document.findUnique({ where: { id }});
    if (!document) return;

    return this._instance(document);
  }

  async findAll(data: DocumentQueryParams) {
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
    const documents = await this.prisma.document.findMany({
      take,
      skip,
      orderBy: { [orderBy]: sortBy },
      ...(where && { where })
    });
    const count = await this.prisma.document.count({
      ...(where && { where })
    });
    if (!count) return;

    const datas = documents.map(document => this._instance(document));
    const result = {
      count,
      pages: count / take,
      datas, 
    }

    return result; 
  }

  async create(data: DocumentBodyDTO) {
    const result = await this.prisma.document.create({ data });
    return this._instance(result);
  }

  async update(data: DocumentUpdateDTO) {
    const foundDocument = await this.find(data.id);
    if (!foundDocument) throw new ApplicationError('Documento não encontrado pelo id', 404);

    const { id: idFoundEmployee, ...restFoundDocument } = foundDocument;
    const { id, ...rest } = data;
    const updatedDocument = await this.prisma.document.update({
      where: { id: id },
      data: {
        ...restFoundDocument,
        ...rest
      }
    });

    return this._instance(updatedDocument);
  }

  async delete(id: string) {
    const foundDocument = await this.find(id);
    if (!foundDocument) throw new ApplicationError('Documento não encontrado pelo id', 404);

    await this.prisma.document.delete({ where: { id } });
  }
}