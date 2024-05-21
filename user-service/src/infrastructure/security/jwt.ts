import jwt from "jsonwebtoken";
import { IUser } from "../../domain/entities/user.entity";
import { ITokenService } from "../../domain/interfaces/services/ITokenService";

export class JwtTokenService implements ITokenService {
  private readonly secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateToken(user: IUser): string {
    return jwt.sign({ userId: user.id }, this.secretKey);
  }
}
