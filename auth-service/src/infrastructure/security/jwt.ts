import jwt, { verify } from "jsonwebtoken";
import { IUser } from "../../domain/entities/user.entity";

const generateJwtTokenService = (secret: string) => {
  return {
    generateToken: (user: IUser) => {
      return jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
        },
        secret,
        {
          expiresIn: "24h",
        }
      );
    },
  };
};

const verifyJwtTokenService = (secret: string) => {
  return {
    verifyToken: (token: string) => {
      try {
        return jwt.verify(token, secret);
      } catch (error) {
        throw new Error("Token verification failed");
      }
    },
  };
};

export { generateJwtTokenService, verifyJwtTokenService };
