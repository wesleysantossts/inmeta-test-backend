import { ApplicationError } from '@/shared/errors/application.error';
import { 
  DocumentTypeBodyDTO, 
  DocumentTypeQueryParams, 
  DocumentTypeUpdateDTO, 
  IDocumentTypeService, 
  IDocumentTypesRepository 
} from '../dtos/documentType.dto';
import { DocumentType } from '@/domain/entities/documentType.entity';
import { IBaseGetAll } from '../dtos/base.dto';

export class DocumentTypeService implements IDocumentTypeService {
  constructor(
    private documentTypeRepository: IDocumentTypesRepository,
  ) {}

  async find(id: string): Promise<DocumentType> {
    const foundDocumentType = await this.documentTypeRepository.find(id);
    if (!foundDocumentType) throw new ApplicationError('Tipo de documento não encontrado pelo id', 404);
    
    const result = foundDocumentType;
    return result;
  }
  
  async findAll(params: DocumentTypeQueryParams): Promise<IBaseGetAll<DocumentType[]>> {
    const result = await this.documentTypeRepository.findAll(params);
    return result;
  }

  async create(data: DocumentTypeBodyDTO): Promise<DocumentType> {
    const employeeExists = await this.documentTypeRepository.findAll({ filters: { name: data.name } });
    if (employeeExists && employeeExists.datas.length > 0) throw new ApplicationError('Tipo de documento já cadastrado', 409);
    
    const createdDocumentType = await this.documentTypeRepository.create(data);
    if (!createdDocumentType) throw new ApplicationError('Não foi possível criar o tipo de documento');
    
    const result = createdDocumentType;
    return result;
  }

  async update(data: DocumentTypeUpdateDTO): Promise<DocumentType> {
    const documentTypeExists = await this.documentTypeRepository.find(data.id);
    if (!documentTypeExists) throw new ApplicationError('Tipo de documento não encontrado pelo id', 404);
    
    const updatedDocumentType = await this.documentTypeRepository.update(data);
    if (!updatedDocumentType) throw new ApplicationError('Não foi possível atualizar o tipo de documento');
    
    const result = updatedDocumentType;
    return result;
  }

  async delete(id: string): Promise<void> {
    const documentExists = await this.documentTypeRepository.find(id);
    if (!documentExists) throw new ApplicationError('Tipo de documento não encontrado pelo id', 404);
    
    await this.documentTypeRepository.delete(id);
  }
}