import { ApplicationError } from '@/shared/errors/application.error';
import { 
  DocumentBodyDTO, 
  DocumentUpdateDTO, 
  IDocumentsService, 
  IDocumentsRepository, 
  DocumentQueryParams
} from '../dtos/document.dto';
import { Document } from '@/domain/entities/document.entity';
import { IEmployeesRepository } from '../dtos/employee.dto';
import { IDocumentTypesRepository } from '../dtos/documentType.dto';
import { IBaseGetAll } from '../dtos/base.dto';

export class DocumentsService implements IDocumentsService {
  constructor(
    private documentRepository: IDocumentsRepository,
    private documentTypeRepository: IDocumentTypesRepository,
    private employeeRepository: IEmployeesRepository,
  ) {}
  
  async find(id: string): Promise<Document> {
    const foundDocument = await this.documentRepository.find(id);
    if (!foundDocument) throw new ApplicationError('Documento não encontrado pelo id', 404);
    
    const result = foundDocument;
    return result;
  }
  
  async findAll(params: DocumentQueryParams): Promise<IBaseGetAll<Document[]>> {
    const result = await this.documentRepository.findAll(params);
    return result;
  }

  async create(data: DocumentBodyDTO): Promise<Document> {
    const documentExists = await this.documentRepository.findAll({ filters: { name: data.name } });
    if (documentExists && documentExists.datas.length > 0) throw new ApplicationError('Documento já cadastrado', 409);
    
    const createdDocument = await this.documentRepository.create(data);
    if (!createdDocument) throw new ApplicationError('Não foi possível criar o documento');
    
    const result = createdDocument;
    return result;
  }

  async update(data: DocumentUpdateDTO): Promise<Document> {
    const documentExists = await this.documentRepository.find(data.id);
    if (!documentExists) throw new ApplicationError('Documento não encontrado pelo id', 404);
    
    const updatedDocument = await this.documentRepository.update(data);
    if (!updatedDocument) throw new ApplicationError('Não foi possível atualizar o documento');
    
    const result = updatedDocument;
    return result;
  }

  async delete(id: string): Promise<void> {
    const documentExists = await this.documentRepository.find(id);
    if (!documentExists) throw new ApplicationError('Documento não encontrado pelo id', 404);
    
    await this.documentRepository.delete(id);
  }
}