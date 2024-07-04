import { Request, Response } from "express";
import { generateAccessTokenService } from "../../infrastructure/security/jwt/generateAccessTokenService";
import { generateRefreshTokenService } from "../../infrastructure/security/jwt/generateRefreshTokenService";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import BcryptHashingService from "../../infrastructure/security/bcrypt";
import { signinUseCase } from "../../application/useCases/signinUseCase";
import { TokenRepository } from "../../infrastructure/database/repositories/TokenRepository";
import { IUser } from "../../domain/entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// Extend the Request interface to include the user property

export const signinController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Call the signin use case
    const user = await signinUseCase(
      UserRepository,
      BcryptHashingService
    )({ email, password });

    // Check if user is found and password is correct
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    // Check if the user is blocked
    if (user.isBlocked) {
      return res
        .status(401)
        .json({ success: false, error: "Please contact admin" });
    }

    // Generate access and refresh tokens
    const accessTokenService = generateAccessTokenService(
      process.env.ACCESS_TOKEN_PRIVATE_KEY!
    );
    const refreshTokenService = generateRefreshTokenService(
      process.env.REFRESH_TOKEN_PRIVATE_KEY!
    );

    // req.user = user;

    const accessToken = accessTokenService.generateToken(user);
    const refreshtoken = await refreshTokenService.generateToken(user);

    // Set tokens in cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 1000,
    }); // 14 minutes
    res.cookie("refreshToken", refreshtoken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Return response with tokens
    return res.status(201).json({ success: true, data: accessToken });
  } catch (error: any) {
    // Handle any errors
    return res.status(500).json({ success: false, error: error.message });
  }
};
