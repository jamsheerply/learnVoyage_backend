import jwt from "jsonwebtoken";
import { IUser } from "../../domain/entities/user.entity";
import { ITokenService } from "../../domain/interfaces/services/ITokenService";

const generateJwtTokenService = (secretkey: string): ITokenService => {
  const generateToken = (user: IUser): string => {
    return jwt.sign({ userId: user.id }, secretkey);
  };
  return {
    generateToken,
  };
};

export default generateJwtTokenService;
