// src/infrastructure/utility/generateJwtTokenService.ts
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { IUser } from "../../domain/entities/user.entity";
import { ITokenService } from "../../domain/interfaces/services/ITokenService";

const generateJwtTokenService = (secretKey: string): ITokenService => {
  const generateToken = (user: IUser): string => {
    const userId = user._id.toHexString();
    return jwt.sign(
      { userId, name: user.firstName, email: user.email },
      secretKey,
      { expiresIn: "1h" }
    );
  };
  return {
    generateToken,
  };
};

export default generateJwtTokenService;
