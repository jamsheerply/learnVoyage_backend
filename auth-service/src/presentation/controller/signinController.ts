import { Request, Response } from "express";
import { generateAccessToken } from "../../infrastructure/security/jwt/generateAccessToken";
import { generateRefreshToken } from "../../infrastructure/security/jwt/generateRefreshToken";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import BcryptHashingService from "../../infrastructure/security/bcrypt";
import { signinUseCase } from "../../application/useCases/signinUseCase";

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
    // const accessTokenService = generateAccessTokenService(
    //   process.env.ACCESS_TOKEN_PRIVATE_KEY!
    // );
    // const refreshTokenService = generateRefreshTokenService(
    //   process.env.REFRESH_TOKEN_PRIVATE_KEY!
    // );

    // const accessToken = accessTokenService.generateToken(user);
    // const refreshtoken = await refreshTokenService.generateToken(user);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    console.log(accessToken);
    console.log(refreshToken);

    // Set tokens in cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 1000,
      sameSite: "none",
      secure: true,
    }); // 14 minutes

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "none",
      secure: true,
    });

    // Return response with tokens
    return res.status(201).json({ success: true, data: accessToken });
  } catch (error: any) {
    // Handle any errors
    return res.status(500).json({ success: false, error: error.message });
  }
};
