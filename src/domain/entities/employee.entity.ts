export class Employee {
  public id: string;
  public name: string;
  public document: string;
  public hiredAt: string;
  public createdAt: string;
  public updatedAt: string;
  public createdBy: string;
  public updatedBy: string;

  constructor(data: Employee) {
    Object.assign(this, data);
  }
}