import { DocumentStatus } from '@/application/dtos/document.dto';

export class Document {
  public id: string;
  public name: string;
  public status: DocumentStatus;
  public employeeId: string;
  public documentTypeId: string;
  public createdAt: string;
  public updatedAt: string;
  public createdBy: string;
  public updatedBy: string;

  constructor(data: Document) {
    Object.assign(this, data);
  }
}