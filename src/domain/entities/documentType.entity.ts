export class DocumentType {
  public id: string;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;
  public createdBy: string;
  public updatedBy: string;

  constructor(data: DocumentType) {
    Object.assign(this, data);
  }
}