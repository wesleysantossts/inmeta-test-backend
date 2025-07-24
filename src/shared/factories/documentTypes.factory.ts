import { DocumentTypeService } from '@/application/services/documentType.service';
import { DocumentTypesRepository } from '@/infrastructure/repositories/documentType.repository';
import { DocumentTypeController } from '@/presentation/controllers/documentType.controller';

export function DocumentTypesFactory() {
  const documentTypesRepository = new DocumentTypesRepository();
  const service = new DocumentTypeService(
    documentTypesRepository
  );
  const controller = new DocumentTypeController(service)
  
  return controller;
}