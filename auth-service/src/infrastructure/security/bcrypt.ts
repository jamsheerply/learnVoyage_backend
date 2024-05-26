import bcrypt from "bcrypt";
import { IHashingService } from "../../domain/interfaces/services/IHashingService";

const BcryptHashingService: IHashingService = {
  hash: async (password: string): Promise<string> => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  },
};

export default BcryptHashingService;
