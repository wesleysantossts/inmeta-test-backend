import { ApplicationError } from '@/shared/errors/application.error';
import { DocumentTypeBodyDTO, DocumentTypeUpdateDTO, IDocumentTypeService, IDocumentTypesRepository } from '../dtos/documentType.dto';
import { DocumentType } from '@/domain/entities/documentType.entity';

export class DocumentTypeService implements IDocumentTypeService {
  constructor(
    private documentTypeRepository: IDocumentTypesRepository,
  ) {}

  async create(data: DocumentTypeBodyDTO): Promise<DocumentType | undefined> {
    const employeeExists = await this.documentTypeRepository.findAll({ filters: { name: data.name } });
    if (employeeExists && employeeExists.datas.length > 0) throw new ApplicationError('Tipo de documento já cadastrado', 409);
    
    const createdDocumentType = await this.documentTypeRepository.create(data);
    if (!createdDocumentType) throw new ApplicationError('Não foi possível criar o tipo de documento');
    
    const result = createdDocumentType;
    return result;
  }

  async update(data: DocumentTypeUpdateDTO): Promise<DocumentType | undefined> {
    const documentTypeExists = await this.documentTypeRepository.find(data.id);
    if (!documentTypeExists) throw new ApplicationError('Tipo de documento não encontrado pelo id', 404);
    
    const updatedDocumentType = await this.documentTypeRepository.update(data);
    if (!updatedDocumentType) throw new ApplicationError('Não foi possível atualizar o tipo de documento');
    
    const result = updatedDocumentType;
    return result;
  }
}