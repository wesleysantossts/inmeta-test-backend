export class DocumentType {
  public id: string;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;
  public createdBy: Date;
  public updatedBy: Date;

  constructor(data: DocumentType) {
    Object.assign(this, data);
  }
}