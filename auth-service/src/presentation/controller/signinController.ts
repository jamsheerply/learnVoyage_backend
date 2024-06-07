import { Request, Response } from "express";
import { signinUseCase } from "../../application/useCases/signinUseCase";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import BcryptHashingService from "../../infrastructure/security/bcrypt";
import { generateJwtTokenService } from "../../infrastructure/security/jwt";

export const signinController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await signinUseCase(
      UserRepository,
      BcryptHashingService
    )({ email, password });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    if (user.isBlocked) {
      return res
        .status(401)
        .json({ success: false, error: "Please contact admin" });
    }

    const tokenService = generateJwtTokenService(process.env.JWT_SECRET!);
    const token = tokenService.generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
    });
    return res.status(200).json({ success: true, data: token });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
