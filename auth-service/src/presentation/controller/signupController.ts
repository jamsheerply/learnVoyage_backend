import { Request, Response } from "express";
import { generateAccessTokenService } from "../../infrastructure/security/jwt/generateAccessTokenService";
import { generateRefreshTokenService } from "../../infrastructure/security/jwt/generateRefreshTokenService";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import BcryptHashingService from "../../infrastructure/security/bcrypt";
import { signupUseCase } from "../../application/useCases/signupUseCase";
import { verifyOtpUseCase } from "../../application/useCases/verifyOtpUseCase";
import { IUser } from "../../domain/entities/user.entity";
import { TokenRepository } from "../../infrastructure/database/repositories/TokenRepository";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const signupController = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const newUser: IUser = {
      id: "",
      firstName,
      lastName,
      email,
      password,
      role,
      profile: {
        avatar: "",
        dob: "",
        gender: "other",
      },
      contact: {
        additionalEmail: "",
        phone: "",
        socialMedia: {
          instagram: "",
          linkedIn: "",
          github: "",
        },
      },
      isBlocked: false,
      isVerified: false,
      profession: "",
      otp: "",
      profit: 0,
    };

    const createdUser = await signupUseCase(
      UserRepository,
      BcryptHashingService
    )(newUser);

    if (!createdUser) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to sign up user!" });
    }

    const accessTokenService = generateAccessTokenService(
      process.env.ACCESS_TOKEN_PRIVATE_KEY!
    );
    const refreshTokenService = generateRefreshTokenService(
      process.env.REFRESH_TOKEN_PRIVATE_KEY!
    );

    // req.user = createdUser; // Attach the created user to the request object

    const accessToken = accessTokenService.generateToken(createdUser);
    const refreshtoken = await refreshTokenService.generateToken(createdUser);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 14 * 60 * 1000,
      sameSite: "strict",
      secure: true,
    });

    res.cookie("refreshToken", refreshtoken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: true,
    });

    return res.status(201).json({ success: true, data: accessToken });
  } catch (error: any) {
    if (error.message === "Email already exists") {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }
    return res
      .status(500)
      .json({ success: false, error: "Failed to sign up user" });
  }
};

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { userId, otp } = req.body;

    const isVerified = await verifyOtpUseCase(UserRepository)(userId, otp);

    if (!isVerified) {
      return res.status(400).json({ success: false, error: "Invalid OTP" });
    }

    const user = await UserRepository.getUserById(userId);
    if (!user) {
      return res.status(500).json({ success: false, error: "User not found" });
    }

    const accessTokenService = generateAccessTokenService(
      process.env.ACCESS_TOKEN_PRIVATE_KEY!
    );
    const refreshTokenService = generateRefreshTokenService(
      process.env.REFRESH_TOKEN_PRIVATE_KEY!
    );

    const accessToken = accessTokenService.generateToken(user);
    const refreshtoken = await refreshTokenService.generateToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 14 * 60 * 1000,
      sameSite: "strict",
      secure: true,
    });

    res.cookie("refreshToken", refreshtoken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: true,
    });

    return res.status(200).json({ success: true, data: accessToken });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to verify OTP" });
  }
};
