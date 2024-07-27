import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { generateAccessToken } from "./generateAccessToken";

interface UserPayload {
  id: string;
  email: string;
  role: string;
  isVerified: boolean;
  firstName: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const verifyToken = (token: string, secret: string): UserPayload | null => {
  try {
    return jwt.verify(token, secret) as UserPayload;
  } catch (err) {
    if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
      console.error(`Error verifying token: ${err.message}`);
      return null;
    }
    throw err;
  }
};

export const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    let user: UserPayload | null = null;

    if (accessToken) {
      user = verifyToken(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY!);
    }

    if (!user && refreshToken) {
      user = verifyToken(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY!);
      if (user) {
        const newAccessToken = generateAccessToken({
          id: user.id,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          firstName: user.firstName,
        });
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          maxAge: 60 * 1000,
          sameSite: "strict",
          secure: true,
        });
      }
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized, please log in again." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in JWT middleware:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
