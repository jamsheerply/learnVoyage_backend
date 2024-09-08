import { Request, Response } from "express";
import { generateAccessToken } from "../../infrastructure/security/jwt/generateAccessToken";
import { generateRefreshToken } from "../../infrastructure/security/jwt/generateRefreshToken";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import BcryptHashingService from "../../infrastructure/security/bcrypt";
import { signupUseCase } from "../../application/useCases/signupUseCase";
import { verifyOtpUseCase } from "../../application/useCases/verifyOtpUseCase";
import { IUser } from "../../domain/entities/user.entity";
import { sendMessage } from "../../infrastructure/messageBroker/producerRpc";

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
    console.log(createdUser);
    if (!createdUser) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to sign up user!" });
    }

    const accessToken = generateAccessToken(createdUser);
    const refreshToken = generateRefreshToken(createdUser);

    console.log(accessToken);
    console.log(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 14 * 60 * 1000,
      sameSite: "strict",
      secure: true,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: true,
    });

    // create-user in chat
    sendMessage(
      "chat-service",
      { type: "createUser", data: createdUser },
      (response: any) => {
        // Specify the type of response as any or more specific type if known
        console.log("Response from content-management-service:", response);
        // Handle the response here
      }
    );
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

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    console.log(accessToken);
    console.log(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 14 * 60 * 1000,
      sameSite: "strict",
      secure: true,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: true,
    });

    //create-chatWithAdmin
    sendMessage(
      "chat-service",
      { type: "createChatWithAdmin", data: user.id },
      (response: any) => {
        // Specify the type of response as any or more specific type if known
        console.log("Response from content-management-service:", response);
        // Handle the response here
      }
    );

    sendMessage(
      "payment-service",
      { type: "createUser", data: user },
      (response: any) => {
        // Specify the type of response as any or more specific type if known
        console.log("Response from content-management-service:", response);
        // Handle the response here
      }
    );

    return res.status(200).json({ success: true, data: accessToken });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to verify OTP" });
  }
};
