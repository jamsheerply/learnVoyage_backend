import bcrypt from "bcrypt";
import { IHashingService } from "../../domain/interfaces/services/IHashingService";

export class BcryptHashingService implements IHashingService {
  async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
