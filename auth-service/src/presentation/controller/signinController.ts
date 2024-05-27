import { Request, Response } from "express";
import { signinService } from "../../application/services/signinService";
import generateJwtTokenService from "../../infrastructure/security/jwt";
import { signinUseCase } from "../../application/useCases/signinUseCase";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepository";
import BcryptHashingService from "../../infrastructure/security/bcrypt";

export const signinContoller = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await signinUseCase(
      UserRepository,
      BcryptHashingService
    )({
      email,
      password,
    });
    if (!user) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to signin user" });
    }
    //Generate JWT token
    const tokenService = generateJwtTokenService(process.env.JWT_SECRET!);
    const token = tokenService.generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to sign up user" });
  }
};
