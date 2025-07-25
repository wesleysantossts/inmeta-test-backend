import { ApplicationError } from '@/shared/errors/application.error';
import { IAuthResponse, IAuthService, SignInParams } from '../dtos/auth.dto';
import { IUsersRepository, UserBodyDTO } from '../dtos/user.dto';
import { EncryptUtils } from '@/shared/utils/encrypt.util';
import { env } from '@/infrastructure/config/environment';
import jwt from 'jsonwebtoken';
import { User } from '@/domain/entities/user.entity';
import { EmployeeBodyDTO, EmployeeLinkDocumentTypesParams, EmployeeQueryParams, EmployeeUnlinkDocumentTypesParams, EmployeeUpdateDTO, IEmployeeService, IEmployeesRepository } from '../dtos/employee.dto';
import { Employee } from '@/domain/entities/employee.entity';
import { IBaseGetAll } from '../dtos/base.dto';
import { DocumentsRepository } from '@/infrastructure/repositories/documents.repository';
import { DocumentStatus } from '../dtos/document.dto';
import { DocumentTypesRepository } from '@/infrastructure/repositories/documentTypes.repository';

export class EmployeeService implements IEmployeeService {
  constructor(
    private employeesRepository: IEmployeesRepository,
    private documentsRepository: DocumentsRepository,
    private documentTypesRepository: DocumentTypesRepository
  ) {}

  async find(id: string): Promise<Employee> {
    const foundEmployee = await this.employeesRepository.find(id);
    if (!foundEmployee) throw new ApplicationError('Colaborador não encontrado pelo id', 404);
    
    const result = foundEmployee;
    return result;
  }
  
  async findAll(params: EmployeeQueryParams): Promise<IBaseGetAll<Employee[]>> {
    const result = await this.employeesRepository.findAll(params);
    return result;
  }

  async create(data: EmployeeBodyDTO): Promise<Employee> {
    const employeeExists = await this.employeesRepository.findAll({ filters: { document: data.document } });
    if (employeeExists && employeeExists.datas.length > 0) throw new ApplicationError('Colaborador já cadastrado', 409);
    
    const createdEmployee = await this.employeesRepository.create(data);
    if (!createdEmployee) throw new ApplicationError('Não foi possível criar o colaborador');
    
    const result = createdEmployee;
    return result;
  }

  async update(data: EmployeeUpdateDTO): Promise<Employee> {
    const employeeExists = await this.employeesRepository.find(data.id);
    if (!employeeExists) throw new ApplicationError('Colaborador não encontrado pelo id', 404);
    
    const updatedEmployee = await this.employeesRepository.update(data);
    if (!updatedEmployee) throw new ApplicationError('Não foi possível atualizar o colaborador');
    
    const result = updatedEmployee;
    return result;
  }

  async delete(id: string): Promise<void> {
    const employeeExists = await this.employeesRepository.find(id);
    if (!employeeExists) throw new ApplicationError('Colaborador não encontrado pelo id', 404);
    
    await this.employeesRepository.delete(id);
  }

  async linkDocumentTypes(data: EmployeeLinkDocumentTypesParams): Promise<void> {
    const {
      id,
      documentTypeIds,
      ...rest
    } = data;
    
    const employeeExists = await this.employeesRepository.find(id);
    if (!employeeExists) throw new ApplicationError('Colaborador não encontrado pelo id', 404);
    
    
    
    const employeeRegisteredDocuments = (await this.documentsRepository.findAll({
      filters: {
        employeeId: id
      }
    })).datas;
    
    const registeredIds = [];
    const invalidIds = [];
    let payload = [];

    for (const docTypeId of documentTypeIds) {
      const docType = await this.documentTypesRepository.find(docTypeId);
      if (!docType) invalidIds.push(docTypeId);
      if (employeeRegisteredDocuments.some(doc => doc.documentTypeId === docTypeId)) 
        registeredIds.push(docTypeId);

      const obj = {
        employeeId: id,
        documentTypeId: docTypeId,
        status: "PENDENTE" as DocumentStatus,
        name: "",
        ...rest
      };
      payload.push(obj);
    }
    if (invalidIds.length > 0) throw new ApplicationError(`Documentos não encontrados pelos ids ${invalidIds.join(',')}`, 404)
    if (registeredIds.length > 0) throw new ApplicationError(`Os seguintes tipos de documentos já foram vinculados para este colaborador. Ids: ${registeredIds.join(',')}`, 400)

    await this.documentsRepository.linkDocumentTypes(payload);
  }
  
  async unlinkDocumentTypes(data: EmployeeUnlinkDocumentTypesParams): Promise<void> {
    const {
      id,
      documentTypeIds,
    } = data;
    
    const employeeExists = await this.employeesRepository.find(id);
    if (!employeeExists) throw new ApplicationError('Colaborador não encontrado pelo id', 404);
    
    const invalidIds = []
    for (const docTypeId of documentTypeIds) {
      const docType = await this.documentTypesRepository.find(docTypeId);
      if (!docType) invalidIds.push(docTypeId);
    }
    if (invalidIds.length > 0) throw new ApplicationError(`Documentos não encontrados pelos ids ${invalidIds.join(',')}`, 404)

    await this.documentsRepository.unLinkDocumentTypes({ id, documentTypeIds });
  }
}