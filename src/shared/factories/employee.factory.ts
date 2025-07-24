import { EmployeeService } from '@/application/services/employee.service';
import { EmployeesRepository } from '@/infrastructure/repositories/employees.repository';
import { EmployeeController } from '@/presentation/controllers/employee.controller';

export function EmployeeFactory() {
  const employeesRepository = new EmployeesRepository();
  const service = new EmployeeService(
    employeesRepository
  );
  const controller = new EmployeeController(service)
  
  return controller;
}