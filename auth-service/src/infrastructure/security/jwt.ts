// src/infrastructure/utility/generateJwtTokenService.ts
import jwt from "jsonwebtoken";
import { IUser } from "../../domain/entities/user.entity";
import { ITokenService } from "../../domain/interfaces/services/ITokenService";

const generateJwtTokenService = (secretKey: string): ITokenService => {
  const generateToken = (user: IUser): string => {
    return jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
  };
  return {
    generateToken,
  };
};

export default generateJwtTokenService;
