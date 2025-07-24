export class Employee {
  public id: string;
  public name: string;
  public document: string;
  public hiredAt: string;
  public createdAt: Date;
  public updatedAt: Date;
  public createdBy: string;
  public updatedBy: string;

  constructor(data: Employee) {
    Object.assign(this, data);
  }
}