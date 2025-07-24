import * as bcrypt from 'bcrypt';

export class EncryptUtils {
  private static readonly salt = Number(process.env.HASH_SALT);

  static async generateHash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt);
  }

  static async comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}