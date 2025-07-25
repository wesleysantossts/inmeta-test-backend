import { DocumentsService } from '@/application/services/documents.service';
import { DocumentsRepository } from '@/infrastructure/repositories/documents.repository';
import { DocumentTypesRepository } from '@/infrastructure/repositories/documentTypes.repository';
import { EmployeesRepository } from '@/infrastructure/repositories/employees.repository';
import { DocumentsController } from '@/presentation/controllers/documents.controller';

export function DocumentFactory() {
  const documentsRepository = new DocumentsRepository();
  const documentTypesRepository = new DocumentTypesRepository();
  const employeesRepository = new EmployeesRepository();
  
  const service = new DocumentsService(
    documentsRepository,
    documentTypesRepository,
    employeesRepository
  );
  const controller = new DocumentsController(service)
  
  return controller;
}