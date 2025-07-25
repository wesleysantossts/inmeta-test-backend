import { EmployeeService } from '@/application/services/employee.service';
import { DocumentsRepository } from '@/infrastructure/repositories/documents.repository';
import { DocumentTypesRepository } from '@/infrastructure/repositories/documentTypes.repository';
import { EmployeesRepository } from '@/infrastructure/repositories/employees.repository';
import { EmployeeController } from '@/presentation/controllers/employee.controller';

export function EmployeeFactory() {
  const employeesRepository = new EmployeesRepository();
  const documentsRepository = new DocumentsRepository();
  const documentTypesRepository = new DocumentTypesRepository();

  const service = new EmployeeService(
    employeesRepository,
    documentsRepository,
    documentTypesRepository
  );
  const controller = new EmployeeController(service)
  
  return controller;
}