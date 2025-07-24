import { DocumentStatus } from '@/application/dtos/document.dto';

export class Document {
  public id: string;
  public name: string;
  public status: DocumentStatus;
  public employeeId: string;
  public documentTypeId: string;
  public createdAt: Date;
  public updatedAt: Date;
  public createdBy: Date;
  public updatedBy: Date;

  constructor(data: Document) {
    Object.assign(this, data);
  }
}