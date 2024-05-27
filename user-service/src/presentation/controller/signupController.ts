// Controller for handling signup requests.
import { Request, Response } from "express";
import { signupRepository } from "../../infrastructure/database/repositories/signupRepository";
import { signupUseCase } from "../../application/signupUseCase";
import BcryptHashingService from "../../infrastructure/security/bcrypt";

export const signupController = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = await signupUseCase(
      signupRepository,
      BcryptHashingService
    )({
      firstName,
      lastName,
      email,
      password,
    });
    return res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to sign up user",
    });
  }
};
