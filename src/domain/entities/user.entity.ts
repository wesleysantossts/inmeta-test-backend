export class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public createdAt: string;
  public updatedAt: string;
  public createdBy: string;
  public updatedBy: string;

  constructor(data: User) {
    Object.assign(this, data);
  }
}