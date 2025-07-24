export class DocumentType {
  public id: string;
  public name: string;
  public createdAt: string;
  public updatedAt: string;
  public createdBy: string;
  public updatedBy: string;

  constructor(data: DocumentType) {
    Object.assign(this, data);
  }
}