// import { Request, Response } from "express";
// import generateJwtTokenService from "../../infrastructure/security/jwt";
// import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
// import BcryptHashingService from "../../infrastructure/security/bcrypt";
// import { signupUseCase } from "../../application/useCases/signupUseCase";

// export const signupController = async (req: Request, res: Response) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;
//     // console.log(req.body);
//     const newUser = await signupUseCase(
//       UserRepository,
//       BcryptHashingService
//     )({
//       firstName,
//       lastName,
//       email,
//       password,
//     });
//     if (!newUser) {
//       return res
//         .status(500)
//         .json({ success: false, error: "Failed to sign up user" });
//     }
//     // Generate JWT token
//     const tokenService = generateJwtTokenService(process.env.JWT_SECRET!);
//     const token = tokenService.generateToken(newUser);
//     console.log(token);

//     // Set token in cookies
//     // res.cookie("token", token, {
//     //   httpOnly: true,
//     //   secure: process.env.NODE_ENV === "production",
//     // });

//     return res.status(201).json({ success: true, data: token });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, error: "Failed to sign up user" });
//   }
// };

import { Request, Response } from "express";
import { generateJwtTokenService } from "../../infrastructure/security/jwt";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import BcryptHashingService from "../../infrastructure/security/bcrypt";
import { signupUseCase } from "../../application/useCases/signupUseCase";
import { verifyOtpUseCase } from "../../application/useCases/verifyOtpUseCase";
import { IUser } from "../../domain/entities/user.entity";

export const signupController = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    console.log(req.body);
    // Create a new user object that matches the IUser interface
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
        .json({ success: false, error: "Failed to sign up user !" });
    }
    // Generate JWT token
    const tokenService = generateJwtTokenService(process.env.JWT_SECRET!);

    const token = tokenService.generateToken(createdUser);
    console.log(token);

    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(201).json({ success: true, data: token });
  } catch (error: any) {
    if (error.message === "Email already exists") {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }
    return res
      .status(500)
      .json({ success: false, error: "Failed to sign up user catch" });
  }
};

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { userId, otp } = req.body;
    console.log(req.body);
    const isVerified = await verifyOtpUseCase(UserRepository)(userId, otp);

    if (!isVerified) {
      return res.status(400).json({ success: false, error: "Invalid OTP" });
    }

    const user = await UserRepository.getUserById(userId);
    if (!user) {
      return res.status(500).json({ success: false, error: "User not found" });
    }

    const tokenService = generateJwtTokenService(process.env.JWT_SECRET!);
    const token = tokenService.generateToken(user);
    console.log(token);
    return res.status(200).json({ success: true, data: token });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to verify OTP" });
  }
};
