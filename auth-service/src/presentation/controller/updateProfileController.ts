import { NextFunction, Request, Response } from "express";
import { updateProfileUseCase } from "../../application/useCases/updateProfileUseCase";
import { UserRepository } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import BcryptHashingService from "../../infrastructure/security/bcrypt";

export const updateProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;

    // Hash password if it is provided
    if (userData.password) {
      const hashedPassword = await BcryptHashingService.hash(userData.password);
      userData.password = hashedPassword;
      console.log(userData.password);
    }

    const updatedProfile = await updateProfileUseCase(UserRepository)(userData);
    return res.status(200).json({ success: true, data: updatedProfile });
  } catch (error) {
    next(error);
  }
};
