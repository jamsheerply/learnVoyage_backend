import { Request, Response } from "express";
import generateJwtTokenService from "../../infrastructure/security/jwt";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository";
import BcryptHashingService from "../../infrastructure/security/bcrypt";
import { signupUseCase } from "../../application/useCases/signupUseCase";

export const signupController = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // console.log(req.body);
    const newUser = await signupUseCase(
      UserRepository,
      BcryptHashingService
    )({
      firstName,
      lastName,
      email,
      password,
    });
    if (!newUser) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to sign up user" });
    }
    // Generate JWT token
    const tokenService = generateJwtTokenService(process.env.JWT_SECRET!);
    const token = tokenService.generateToken(newUser);
    console.log(token);

    // Set token in cookies
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    // });

    return res.status(201).json({ success: true, data: token });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to sign up user" });
  }
};
