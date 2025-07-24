export class Employee {
  public id: string;
  public name: string;
  public document: string;
  public hiredAt: string;
  public createdAt: Date;
  public updatedAt: Date;
  public createdBy: Date;
  public updatedBy: Date;

  constructor(data: Employee) {
    Object.assign(this, data);
  }
}